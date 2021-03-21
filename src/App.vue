<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style>
:root {
    --primany: hsla(200, 98%, 48%, 1);
    --red: hsla(0, 88%, 60%, 1);
    --dark-20: hsla(0, 0%, 20%, 1);
    --dark-40: hsla(0, 0%, 40%, 1);
    --dark-60: hsla(0, 0%, 60%, 1);
    --dark-80: hsla(0, 0%, 80%, 1);
    --dark-90: hsla(0, 0%, 90%, 1);
    --dark-96: hsla(0, 0%, 96%, 1);
    --dark-98: hsla(0, 0%, 97.5%, 1);

    --bg-primany: hsla(200, 98%, 48%, 0.08);
    --bg-dark-1: hsla(0, 0%, 0%, 0.1);
    --bg-dark-2: hsla(0, 0%, 0%, 0.2);
    --bg-dark-3: hsla(0, 0%, 0%, 0.3);

    --shadow-btn: 0 1rem 3.2rem -1.2rem hsla(200, 37%, 31%, 0.5);
    --shadow-bar: 0 1.2rem 2rem -1.6rem hsla(200, 37%, 31%, 0.5);
    --shadow-box: 0 1.2rem 2rem -2rem hsla(200, 37%, 31%, 0.5),
                  0 0 .4rem -.1rem hsla(200, 37%, 31%, 0.5);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 10px;
    line-height: 1;
    font-family: "PingFang SC", "Microsoft Yahei", sans-serif;
    text-decoration: none;
    list-style-type: none;
    color: var(--dark-20);
}
#app {
    width: 100%;
    overflow-x: hidden;
}

.btn {
    display: inline-block;
    padding: 1.4rem 0;
    text-align: center;
    font-size: 1.6rem;
    font-weight: 400;
    white-space: nowrap;
    color: white;
    background: var(--primany);
    transition: all ease, 0.3s;
}

::-webkit-scrollbar{
    height: 0;
    width: 0;
}
</style>