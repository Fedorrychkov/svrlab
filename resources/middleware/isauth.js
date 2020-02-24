export default function ({app, redirect, store, error}) {
  const isAuth = store.state.modules.auth.profile || app.$apolloHelpers.getToken()
  if (isAuth) {
    redirect('/profile')
  }
}
