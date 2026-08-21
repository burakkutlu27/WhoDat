import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { FamousPersonCategory } from '@/lib/game/types'
import {
  buildName,
  buildPlayer,
  buildRoom,
  createSupabaseFake,
  type FakeTables,
} from '@/test/supabaseFake'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const {
  addClueCardItem,
  answerSharedQuestion,
  askSharedQuestion,
  askTextQuestion,
  autoAssignNames,
  createRoom,
  getClassicRetiredNames,
  getGameState,
  getPlayerClueCard,
  getPlayerLives,
  getPlayerPassRights,
  getPlayerPersistentData,
  getPlayerSpeedData,
  giveUp,
  makeGuess,
  passTurn,
  resolveTextVoteInternal,
  setCommunicationMode,
  setPlayerLives,
  setPlayerPassRights,
  setPlayerPhaseReady,
  setRoomCategory,
  setRoomDifficulty,
  setRoomMode,
  setRoomTarget,
  startGame,
  startNextPhaseByHost,
  submitNames,
  submitTextVote,
} = await import('./engine')

describe('Katman 2 — Azaltılmış UI Matrisi (12 Kritik Senaryo & 7 Maddelik Kontrol Listesi)', () => {
  beforeEach(() => {
    fake = createSupabaseFake()
  })

  it('Senaryo 1: Klasik | Sesli | Tek (Ünlüler) | Kolay | 2 Oyuncu', async () => {
    const { roomId, playerId: p1 } = await createRoom('P1_Host', 'classic', {
      communicationMode: 'voice',
      categoryMode: 'single',
      category: 'unluler',
      difficulty: 'kolay',
    })
    const p2Player = buildPlayer(roomId, { nickname: 'P2_Guest', is_host: false })
    fake.tables.players.push(p2Player)
    const p2 = p2Player.id

    await autoAssignNames(roomId, p1)
    await startGame(roomId, p1)

    // 1. Hiçbir oyuncuya kendi yazdığı isim atanmadı mı?
    const s1 = await getGameState(roomId, p1)
    const s2 = await getGameState(roomId, p2)
    const name1 = fake.tables.names.find((n) => n.id === s1.you.targetNameId)
    const name2 = fake.tables.names.find((n) => n.id === s2.you.targetNameId)
    expect(name1?.submitted_by).not.toBe(p1)
    expect(name2?.submitted_by).not.toBe(p2)

    // 2. Sıra kurala uygun ilerledi mi?
    const initialTurn = s1.room.currentPlayerId
    await passTurn(roomId, initialTurn!)
    const afterTurn = await getGameState(roomId, p1)
    expect(afterTurn.room.currentPlayerId).not.toBe(initialTurn)

    // 3. Her oyuncu kendi can/pas hakkını gördü mü?
    setPlayerLives(roomId, p1, 2)
    setPlayerLives(roomId, p2, 3)
    const stateP1 = await getGameState(roomId, p1)
    const stateP2 = await getGameState(roomId, p2)
    expect(stateP1.you.livesLeft).toBe(2)
    expect(stateP2.you.livesLeft).toBe(3)

    // 4. Bir isim pas geçildiğinde bir daha kimseye çıkmadı mı?
    const pId = fake.tables.rooms[0]!.current_player_id!
    const retiredBefore = getClassicRetiredNames(roomId).size
    await giveUp(roomId, pId)
    expect(getClassicRetiredNames(roomId).size).toBeGreaterThan(retiredBefore)

    // 5. Not defteri temizlendi mi?
    const activeForClue = fake.tables.rooms[0]!.current_player_id!
    addClueCardItem(roomId, activeForClue, {
      id: 'item-1',
      questionText: 'Kadın mı?',
      yesCount: 1,
      noCount: 0,
      unansweredCount: 0,
      majority: 'yes',
      timestamp: new Date().toISOString(),
    })
    await giveUp(roomId, activeForClue)
    const pState = await getGameState(roomId, activeForClue)
    expect(pState.you.clueCard).toHaveLength(0)

    // 6. Oyun finished durumuna düzgün ulaştı mı?
    while (fake.tables.rooms[0]!.status === 'playing') {
      const activeP = fake.tables.rooms[0]!.current_player_id!
      const activeId = fake.tables.rooms[0]!.current_identity_id!
      const row = fake.tables.names.find((n) => n.id === activeId)
      if (!row) break
      const res = await makeGuess(roomId, activeP, row.name_text)
      if (res.finished) break
    }
    const finalState = await getGameState(roomId, p1)
    expect(finalState.room.status).toBe('finished')

    // 7. Realtime pasif izleme doğrulaması
    expect(finalState.room.isGameActive).toBe(false)
  })

  it('Senaryo 2: Klasik | Tam Metin | Tek (Tarihi Kişiler) | Orta | 3 Oyuncu (12-Nihai Konsolide Plan & Kök Neden C Regresyonu)', async () => {
    const { roomId, playerId: p1 } = await createRoom('P1', 'classic', {
      communicationMode: 'text',
      categoryMode: 'single',
      category: 'tarihi_kisiler',
      difficulty: 'orta',
    })
    const p2Player = buildPlayer(roomId, { nickname: 'P2', is_host: false })
    const p3Player = buildPlayer(roomId, { nickname: 'P3', is_host: false })
    fake.tables.players.push(p2Player, p3Player)
    const p2 = p2Player.id
    const p3 = p3Player.id

    await autoAssignNames(roomId, p1)
    await startGame(roomId, p1)

    // Düzeltme 2 Doğrulaması: Herkes HER ZAMAN kendi can/pas hakkını görür (orta panel izolasyonu)
    setPlayerLives(roomId, p1, 1)
    setPlayerLives(roomId, p2, 2)
    setPlayerLives(roomId, p3, 3)
    setPlayerPassRights(roomId, p1, 3)
    setPlayerPassRights(roomId, p2, 2)
    setPlayerPassRights(roomId, p3, 1)

    const stateP1 = await getGameState(roomId, p1)
    const stateP2 = await getGameState(roomId, p2)
    const stateP3 = await getGameState(roomId, p3)
    expect(stateP1.you.livesLeft).toBe(1)
    expect(stateP1.you.passRightsRemaining).toBe(3)
    expect(stateP2.you.livesLeft).toBe(2)
    expect(stateP2.you.passRightsRemaining).toBe(2)
    expect(stateP3.you.livesLeft).toBe(3)
    expect(stateP3.you.passRightsRemaining).toBe(1)

    // Düzeltme 1 Doğrulaması: Tam Metin soru sorulunca cevap ne olursa olsun sıra HER ZAMAN otomatik devreder
    const asker = fake.tables.rooms[0]!.current_player_id!
    const responders = [p1, p2, p3].filter((id) => id !== asker)

    const askRes = await askTextQuestion(roomId, asker, { questionText: 'Tarihi bir lider miyim?' })
    expect(askRes.voteId).toBeDefined()

    // 1. Seçmen Evet oyu verir (henüz sonuçlanmaz)
    const vote1 = await submitTextVote(roomId, responders[0]!, askRes.voteId, true)
    expect(vote1.isResolved).toBe(false)
    expect(vote1.turnPassed).toBe(false)

    // 2. Seçmen de Evet oyu verir -> Çoğunluk EVET olsa bile sıra OTOMATİK sonraki oyuncuya geçer!
    const vote2 = await submitTextVote(roomId, responders[1]!, askRes.voteId, true)
    expect(vote2.isResolved).toBe(true)
    expect(vote2.clueCardItem?.majority).toBe('yes')
    expect(vote2.turnPassed).toBe(true)

    // Askerin defterine soru kaydedilmiştir ve sıra askerden çıkmıştır
    const askerState = await getGameState(roomId, asker)
    expect(askerState.you.clueCard).toHaveLength(1)
    expect(askerState.you.clueCard?.[0]?.questionText).toBe('Tarihi bir lider miyim?')
    expect(askerState.you.clueCard?.[0]?.majority).toBe('yes')
    expect(fake.tables.rooms[0]!.current_player_id).not.toBe(asker)

    // Netleştirme 1 & Pas Hakkı Doğrulaması: Sıradaki oyuncu ismi pas geçer
    const currentActivePlayer = fake.tables.rooms[0]!.current_player_id!
    const activeTargetId = fake.tables.rooms[0]!.current_identity_id!
    const activeNameRow = fake.tables.names.find((n) => n.id === activeTargetId)!

    // Oyuncunun not defterine geçici ipucu ekleyelim
    addClueCardItem(roomId, currentActivePlayer, {
      id: 'vote-temp',
      questionText: 'Padişah mıyım?',
      yesCount: 2,
      noCount: 0,
      unansweredCount: 0,
      majority: 'yes',
      timestamp: new Date().toISOString(),
    })
    expect(getPlayerClueCard(roomId, currentActivePlayer)).toHaveLength(1)

    const retiredBefore = getClassicRetiredNames(roomId).size
    const giveUpRes = await giveUp(roomId, currentActivePlayer)
    expect(giveUpRes.livesLeft).toBe(3) // Yeni isim için hak 3'e resetlendi
    expect(getClassicRetiredNames(roomId).has(activeNameRow.id)).toBe(true)
    expect(getClassicRetiredNames(roomId).size).toBeGreaterThan(retiredBefore)
    // Not defteri yeni hedefe geçildiği için temizlenmiş olmalı
    expect(getPlayerClueCard(roomId, currentActivePlayer)).toHaveLength(0)

    // Kök Neden C — Atomik Güncelleme (Race Condition Koruması) Doğrulaması:
    // Yeni bir soru oylaması açalım ve aynı anda 2 eşzamanlı kapatma çağrısı simüle edelim
    const nextAsker = fake.tables.rooms[0]!.current_player_id!
    const askRes2 = await askTextQuestion(roomId, nextAsker, { questionText: '20. yüzyılda mı yaşadım?' })
    
    // DB tablosunda oylama açık
    const voteRow = fake.tables.question_votes?.find((v) => v.id === askRes2.voteId)
    expect(voteRow?.status).toBe('open')

    // Eşzamanlı 2 kapatma çağrısı (Örn: aynı anda gelen lazy cleanup ve vote isteği)
    const [resolveResult1, resolveResult2] = await Promise.all([
      resolveTextVoteInternal(roomId, askRes2.voteId),
      resolveTextVoteInternal(roomId, askRes2.voteId),
    ])

    // Atomik koşullu güncelleme (status='open') sayesinde yalnızca BİRİ ClueCardItem döndürür, diğeri null alır
    const successfulResolutions = [resolveResult1, resolveResult2].filter((r) => r !== null)
    expect(successfulResolutions).toHaveLength(1)
    expect(successfulResolutions[0]?.questionText).toBe('20. yüzyılda mı yaşadım?')
  })

  it('Senaryo 3: Hız Modu | Sesli | Tek (Sporcular) | Zor | 4 Oyuncu', async () => {
    const { roomId, playerId: p1 } = await createRoom('P1', 'speed', {
      communicationMode: 'voice',
      categoryMode: 'single',
      category: 'sporcular',
      difficulty: 'zor',
    })
    const players = [p1]
    for (let i = 2; i <= 4; i++) {
      const p = buildPlayer(roomId, { nickname: `P${i}`, is_host: false })
      fake.tables.players.push(p)
      players.push(p.id)
    }

    await autoAssignNames(roomId, p1)
    await startGame(roomId, p1)

    // Tur 1: Her oyuncuya farklı ve çakışmasız isim atanmış mı
    const assignedNameIds = new Set<string>()
    for (const pid of players) {
      const state = await getGameState(roomId, pid)
      expect(state.you.targetNameId).toBeTruthy()
      assignedNameIds.add(state.you.targetNameId!)
    }
    expect(assignedNameIds.size).toBe(4)

    // Round içinde atama sabit kalmalı, sadece round kapanınca yenilenmeli
    const firstP = fake.tables.rooms[0]!.current_player_id!
    const nameBefore = (await getGameState(roomId, firstP)).you.targetNameId
    await passTurn(roomId, firstP)
    // Diğer 3 oyuncu da pas geçsin
    for (let i = 0; i < 3; i++) {
      const current = fake.tables.rooms[0]!.current_player_id!
      await passTurn(roomId, current)
    }
    // Sıra tekrar ilk oyuncuya geldiğinde ismi değişmemiş olmalı
    const nameAfter = (await getGameState(roomId, firstP)).you.targetNameId
    expect(nameAfter).toBe(nameBefore)
  })

  it('Senaryo 4: Hız Modu | Tam Metin | 3 Fazlı Karışık | Orta | 6 Oyuncu', async () => {
    const phaseCats: FamousPersonCategory[] = ['sporcular', 'cizgi_karakterler', 'tarihi_kisiler']
    const { roomId, playerId: p1 } = await createRoom('P1', 'speed', {
      communicationMode: 'text',
      categoryMode: 'multi_phase',
      phaseCategories: phaseCats,
      difficulty: 'orta',
    })
    const players = [p1]
    for (let i = 2; i <= 6; i++) {
      const p = buildPlayer(roomId, { nickname: `P${i}`, is_host: false })
      fake.tables.players.push(p)
      players.push(p.id)
    }

    await autoAssignNames(roomId, p1)
    await startGame(roomId, p1)

    // Faz 1 kontrolü
    const s1 = await getGameState(roomId, p1)
    expect(s1.room.currentPhase).toBe(1)
    expect(s1.room.activeCategory).toBe('sporcular')
    expect(s1.room.communicationMode).toBe('text')
    expect(s1.players).toHaveLength(6)

    // Tam Metin oylama
    const asker = fake.tables.rooms[0]!.current_player_id!
    const askRes = await askTextQuestion(roomId, asker, { questionText: 'Aktif sporcu muyum?' })
    for (const responderId of players.filter((id) => id !== asker)) {
      await submitTextVote(roomId, responderId, askRes.voteId, true)
    }
    const askerState = await getGameState(roomId, asker)
    expect(askerState.you.clueCard).toHaveLength(1)
  })

  it('Senaryo 5: Israrcı | Sesli | Tek (Kurgusal & Çizgi) | Kolay | 2 Oyuncu', async () => {
    const { roomId, playerId: p1 } = await createRoom('P1', 'persistent', {
      communicationMode: 'voice',
      categoryMode: 'single',
      category: 'cizgi_karakterler',
      difficulty: 'kolay',
    })
    const p2Player = buildPlayer(roomId, { nickname: 'P2', is_host: false })
    fake.tables.players.push(p2Player)
    const p2 = p2Player.id

    await autoAssignNames(roomId, p1)
    await startGame(roomId, p1)

    // Bütçe ve can başlangıç kontrolü
    const stateP1 = await getGameState(roomId, p1)
    expect(stateP1.you.questionBudgetRemaining).toBe(10)
    expect(stateP1.you.livesLeft).toBe(3)

    // 1 soru sor -> bütçe 9
    const activeP = fake.tables.rooms[0]!.current_player_id!
    await passTurn(roomId, activeP)
    const afterP = await getGameState(roomId, activeP)
    expect(afterP.you.questionBudgetRemaining).toBe(9)
    expect(afterP.you.livesLeft).toBe(3)

    // Yanlış tahmin -> can 2, bütçe değişmez
    const otherP = fake.tables.rooms[0]!.current_player_id!
    await makeGuess(roomId, otherP, 'Yanlış Karakter')
    const afterOther = await getGameState(roomId, otherP)
    expect(afterOther.you.livesLeft).toBe(2)
  })

  it('Senaryo 6: Israrcı | Tam Metin | Tek (Tümü/Karışık) | Zor | 5 Oyuncu', async () => {
    const { roomId, playerId: p1 } = await createRoom('P1', 'persistent', {
      communicationMode: 'text',
      categoryMode: 'single',
      category: 'all',
      difficulty: 'zor',
    })
    const players = [p1]
    for (let i = 2; i <= 5; i++) {
      const p = buildPlayer(roomId, { nickname: `P${i}`, is_host: false })
      fake.tables.players.push(p)
      players.push(p.id)
    }

    await autoAssignNames(roomId, p1)
    await startGame(roomId, p1)

    // Oyuncunun bütçesini 0 yapalım
    const activeP = fake.tables.rooms[0]!.current_player_id!
    const pData = getPlayerPersistentData(roomId, activeP)
    pData.questionBudgetRemaining = 0

    // Soru sormayı denediğinde reddedilmeli
    await expect(
      askTextQuestion(roomId, activeP, { questionText: 'Bir soru sorabilir miyim?' }),
    ).rejects.toMatchObject({
      code: 'budget_exhausted',
    })

    // Sadece tahmin yapabilmeli
    const guessRes = await makeGuess(roomId, activeP, 'Rastgele Tahmin')
    expect(guessRes.correct).toBe(false)
  })

  it('Senaryo 7: Ortak Hedef | Sesli | Tek (Dizi & Film) | Orta | 3 Oyuncu', async () => {
    const { roomId, playerId: hostId } = await createRoom('HostReferee', 'shared_target', {
      communicationMode: 'voice',
      categoryMode: 'single',
      category: 'dizi_film_karakterleri',
      difficulty: 'orta',
    })
    const p1Player = buildPlayer(roomId, { nickname: 'P1', is_host: false })
    const p2Player = buildPlayer(roomId, { nickname: 'P2', is_host: false })
    fake.tables.players.push(p1Player, p2Player)
    const p1 = p1Player.id
    const p2 = p2Player.id

    await setRoomTarget(roomId, hostId, 'Polat Alemdar')
    await startGame(roomId, hostId)

    // Host yarışmacı olamaz, tahmin yapamaz
    const hostState = await getGameState(roomId, hostId)
    expect(hostState.you.isReferee).toBe(true)
    expect(hostState.room.sharedTargetName).toBe('Polat Alemdar')
    await expect(makeGuess(roomId, hostId, 'Polat Alemdar')).rejects.toMatchObject({
      code: 'host_cannot_guess',
    })

    // Yarışmacı hedefi göremez
    const p1State = await getGameState(roomId, p1)
    expect(p1State.you.isReferee).toBe(false)
    expect(p1State.room.sharedTargetName).toBeNull()

    // Yarışmacı soru sorar -> Host yanıtlar
    const currentAsker = fake.tables.rooms[0]!.current_player_id!
    const askRes = await askSharedQuestion(roomId, currentAsker, 'Ana karakter mi?')
    const ansRes = await answerSharedQuestion(roomId, hostId, askRes.question.id, 'yes')
    expect(ansRes.message).toContain('Cevap kaydedildi')
  })

  it('Senaryo 8: Ortak Hedef | Tam Metin | 3 Fazlı Karışık | Kolay | 4 Oyuncu', async () => {
    const phaseCats: FamousPersonCategory[] = ['dizi_film_karakterleri', 'sporcular', 'unluler']
    const { roomId, playerId: hostId } = await createRoom('HostReferee', 'shared_target', {
      communicationMode: 'text',
      categoryMode: 'multi_phase',
      phaseCategories: phaseCats,
      difficulty: 'kolay',
    })
    const players = [hostId]
    for (let i = 1; i <= 3; i++) {
      const p = buildPlayer(roomId, { nickname: `Contestant_${i}`, is_host: false })
      fake.tables.players.push(p)
      players.push(p.id)
    }

    await setRoomTarget(roomId, hostId, 'Bihter Ziyagil')
    await startGame(roomId, hostId)

    const hostState = await getGameState(roomId, hostId)
    expect(hostState.room.totalPhases).toBe(3)
    expect(hostState.room.currentPhase).toBe(1)
    expect(hostState.room.activeCategory).toBe('dizi_film_karakterleri')
  })

  it('Senaryo 9: Klasik | Tam Metin | Tek (Tümü/Karışık) | Orta | 6 Oyuncu', async () => {
    const { roomId, playerId: p1 } = await createRoom('P1', 'classic', {
      communicationMode: 'text',
      categoryMode: 'single',
      category: 'all',
      difficulty: 'orta',
    })
    const players = [p1]
    for (let i = 2; i <= 6; i++) {
      const p = buildPlayer(roomId, { nickname: `P${i}`, is_host: false })
      fake.tables.players.push(p)
      players.push(p.id)
    }

    await autoAssignNames(roomId, p1)
    await startGame(roomId, p1)

    // 6 oyuncu ile tam metin oylama turu
    const asker = fake.tables.rooms[0]!.current_player_id!
    const responders = players.filter((id) => id !== asker)
    expect(responders).toHaveLength(5)

    const askRes = await askTextQuestion(roomId, asker, { questionText: 'Yaşıyor mu?' })
    for (let i = 0; i < 4; i++) {
      const v = await submitTextVote(roomId, responders[i]!, askRes.voteId, true)
      expect(v.isResolved).toBe(false)
    }
    // Son oy ile çözülür
    const finalVote = await submitTextVote(roomId, responders[4]!, askRes.voteId, true)
    expect(finalVote.isResolved).toBe(true)
    expect(finalVote.clueCardItem?.majority).toBe('yes')
  })

  it('Senaryo 10: Hız Modu | Sesli | Tek (Tümü/Karışık) | Kolay | 2 Oyuncu', async () => {
    const { roomId, playerId: p1 } = await createRoom('P1', 'speed', {
      communicationMode: 'voice',
      categoryMode: 'single',
      category: 'all',
      difficulty: 'kolay',
    })
    const p2Player = buildPlayer(roomId, { nickname: 'P2', is_host: false })
    fake.tables.players.push(p2Player)
    const p2 = p2Player.id

    await autoAssignNames(roomId, p1)
    await startGame(roomId, p1)

    // 2 oyunculu hızlı akış
    const currentP = fake.tables.rooms[0]!.current_player_id!
    const nextP = currentP === p1 ? p2 : p1
    await passTurn(roomId, currentP)
    expect(fake.tables.rooms[0]!.current_player_id).toBe(nextP)
  })

  it('Senaryo 11: Israrcı | Sesli | 3 Fazlı Karışık | Orta | 3 Oyuncu', async () => {
    const phaseCats: FamousPersonCategory[] = ['tarihi_kisiler', 'unluler', 'sporcular']
    const { roomId, playerId: p1 } = await createRoom('P1', 'persistent', {
      communicationMode: 'voice',
      categoryMode: 'multi_phase',
      phaseCategories: phaseCats,
      difficulty: 'orta',
    })
    const p2Player = buildPlayer(roomId, { nickname: 'P2', is_host: false })
    const p3Player = buildPlayer(roomId, { nickname: 'P3', is_host: false })
    fake.tables.players.push(p2Player, p3Player)
    const p2 = p2Player.id
    const p3 = p3Player.id

    await autoAssignNames(roomId, p1)
    await startGame(roomId, p1)

    const s1 = await getGameState(roomId, p1)
    expect(s1.room.currentPhase).toBe(1)
    expect(s1.room.totalPhases).toBe(3)
    expect(s1.room.activeCategory).toBe('tarihi_kisiler')
  })

  it('Senaryo 12: Ortak Hedef | Sesli | Tek (Ünlüler) | Zor | 6 Oyuncu', async () => {
    const { roomId, playerId: hostId } = await createRoom('HostReferee', 'shared_target', {
      communicationMode: 'voice',
      categoryMode: 'single',
      category: 'unluler',
      difficulty: 'zor',
    })
    const players = [hostId]
    for (let i = 1; i <= 5; i++) {
      const p = buildPlayer(roomId, { nickname: `Contestant_${i}`, is_host: false })
      fake.tables.players.push(p)
      players.push(p.id)
    }

    await setRoomTarget(roomId, hostId, 'Tarkan')
    await startGame(roomId, hostId)

    // 5 yarışmacı arasında soru sorma rotasyonu
    const asker1 = fake.tables.rooms[0]!.current_player_id!
    expect(asker1).not.toBe(hostId)

    const ask1 = await askSharedQuestion(roomId, asker1, 'Şarkıcı mı?')
    await answerSharedQuestion(roomId, hostId, ask1.question.id, 'yes')

    const asker2 = fake.tables.rooms[0]!.current_player_id!
    expect(asker2).not.toBe(asker1)
    expect(asker2).not.toBe(hostId)
  })
})
