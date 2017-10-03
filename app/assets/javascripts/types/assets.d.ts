
declare module '*.svg' {
  const content: string
  export = content
}

declare module '*.png' {
  const content: string
  export = content
}

declare module '*.gif' {
  const content: string
  export = content
}

declare module '*.jpeg' {
  const content: string
  export = content
}

declare module '*.jpg' {
  const content: string
  export = content
}

interface StringMap {
  [key: string]: string
}

declare module '*.css' {
  const content: StringMap
  export = content
}

declare module '*.scss' {
  const content: StringMap
  export = content
}

declare module '*.sass' {
  const content: StringMap
  export default content
}
