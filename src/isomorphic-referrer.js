import defaultUserAgent from 'default-user-agent'

const defaultBrowserReferrer = () => {
  if (
    typeof window !== 'undefined' &&
    window !== null &&
    window.document &&
    window.document.referrer
  ) {
    return window.document.referrer
  }
  return null
}

export { defaultBrowserUserAgent as browserUserAgent }
export default (browserUserAgent = defaultBrowserUserAgent) =>
  browserUserAgent() || defaultUserAgent()
