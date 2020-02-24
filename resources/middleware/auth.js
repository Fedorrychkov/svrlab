export default function ({app, redirect, store, error, route}) {
  const isAuth = store.state.modules.auth.profile || app.$apolloHelpers.getToken()
  if (!isAuth) {
    redirect(`/login?redirect=${route.fullPath}`)
  }
}
