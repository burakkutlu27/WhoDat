-- player_profiles ve game_results anon'a kapatılır.
--
-- İstemci bu tablolara doğrudan hiç erişmiyor; istatistikler sunucudaki /api/profile/stats
-- üzerinden service_role ile okunuyor. Açık okuma, tüm cihaz kimliklerini (device_id) herkese
-- gösteriyordu. Faz 4'te "bu cihazın geçmişini hesabıma bağla" geldiğinde bu, başkasının
-- device_id'siyle onun rekorlarını sahiplenmeye izin verirdi. device_id artık yalnızca
-- sahibinin tarayıcısında bilinir.

drop policy if exists "player_profiles_public_read" on public.player_profiles;
drop policy if exists "game_results_public_read" on public.game_results;

-- Politika yok + RLS açık = anon/authenticated için tümüyle kapalı (names/room_runtime deseni).
revoke all on public.player_profiles from anon, authenticated;
revoke all on public.game_results from anon, authenticated;
