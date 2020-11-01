export type StandardReturn = StandardReturnSuccess | StandardReturnFailure

interface StandardReturnSuccess {
  success: true
}

interface StandardReturnFailure {
  success: false
  error: string
}
