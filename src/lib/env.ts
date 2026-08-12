import 'server-only'

/**
 * Sunucu tarafı ortam değişkenleri.
 *
 * Getter kullanılıyor çünkü değerler modül yüklenirken değil, ilk kullanıldıklarında
 * okunmalı. Aksi halde `next build` sırasında sırlar tanımlı olmadığında build patlar.
 */

function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Ortam değişkeni tanımlı değil: ${name}. Örnek için env.example dosyasına bakın.`)
  }
  return value
}

export const serverEnv = {
  get supabaseUrl() {
    return required('NEXT_PUBLIC_SUPABASE_URL')
  },

  /** RLS'i baypas eder. Asla istemciye gönderilmemeli. */
  get supabaseServiceRoleKey() {
    return required('SUPABASE_SERVICE_ROLE_KEY')
  },

  get sessionSecret() {
    const secret = required('SESSION_SECRET')
    if (secret.length < 32) {
      throw new Error('SESSION_SECRET en az 32 karakter olmalı.')
    }
    return secret
  },
}
