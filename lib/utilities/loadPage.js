export const prefetchPage = pathname => window.___loader.enqueue(pathname)

export const loadPage = pathname => window.___loader.hovering(pathname)
