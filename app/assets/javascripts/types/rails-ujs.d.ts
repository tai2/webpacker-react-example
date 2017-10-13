declare module 'rails-ujs' {
  const Rails: {
    start(): void
    csrfToken(): string | undefined
  }

  export = Rails
}
