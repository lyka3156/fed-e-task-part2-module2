// import posts from './posts/posts'            // 这是静态导入
// import album from './album/album'

const render = () => {
    const hash = window.location.hash || '#posts'

    const mainElement = document.querySelector('.main')

    mainElement.innerHTML = ''

    if (hash === '#posts') {
        // mainElement.appendChild(posts())
        // 动态导入
        import(/* webpackChunkName: 'components' */'./posts/posts').then(({ default: posts }) => {
            mainElement.appendChild(posts())
        })
    } else if (hash === '#album') {
        // mainElement.appendChild(album())
        import(/* webpackChunkName: 'components' */'./album/album').then(({ default: album }) => {
            mainElement.appendChild(album())
        })
    }
}

render()

window.addEventListener('hashchange', render)
