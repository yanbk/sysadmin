const title = 'VUE-ADMIN'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle}`
    }
    return `${title}`
}