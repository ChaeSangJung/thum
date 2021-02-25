// desktop first

const size = {
    mobile: '770px',
    tabletS: '1024px',
    tabletM: '1220px',
    tabletL: '1280px',
    laptop: '1460px',
    desktop: '1700px',
}

const theme = {
    mobile: `(max-width: ${size.mobile})`,
    tabletS: `(max-width: ${size.tabletS})`,
    tabletM: `(max-width: ${size.tabletM})`,
    tabletL: `(max-width: ${size.tabletL})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(min-width: ${size.desktop})`,
}

// mobile first
// const theme = {
//     mobile: `(max-width: ${size.mobile})`,
//     tabletS: `(min-width: ${size.tabletS})`,
//     tabletM: `(min-width: ${size.tabletM})`,
//     tabletL: `(min-width: ${size.tabletL})`,
//     laptop: `(min-width: ${size.laptop})`,
//     desktop: `(min-width: ${size.desktop})`,
// }

export default theme;