
declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

interface StringMap {
  [key: string]: string
}

declare module '*.css' {
  const content: StringMap
  export default content
}

declare module '*.scss' {
  const content: StringMap
  export default content
}

declare module '*.sass' {
  const content: StringMap
  export default content
}
