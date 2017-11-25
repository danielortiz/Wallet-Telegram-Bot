export const formatVerboseUser = (user = {}) => {
  let verboseUser = []
  if (user.firstName) {
    verboseUser.push(user.firstName)
  }
  if (user.lastName) {
    verboseUser.push(user.lastName)
  }
  if(user.username) {
    verboseUser.push(`(@${user.username})`)
  }
  return verboseUser.join(' ')
}