import { createApp } from 'vue';
import App from './App.vue';
// import PlanetPage from './PlanetPage.vue';
// import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPinia } from 'pinia';

const pinia = createPinia();

// const routes: RouteRecordRaw[] = [
// 	{
// 		path: '/',
// 		meta: { title: 'TonyStr' },
// 		component: PlanetPage,
// 	},
// 	{
// 		path: '/blog',
// 		meta: { title: 'TonyStr\'s blog' },
// 		component: () => import('./pages/blog/index.vue'),
// 	},
// 	{
// 		path: '/blog/:article',
// 		component: () => import('./pages/blog/index.vue'),
// 	},
// ];
//
// const router = createRouter({
// 	history: createWebHistory(),
// 	routes,
// });

// router.beforeEach((to, from, next) => {
// 	if (to.meta.title && typeof to.meta.title === 'string') {
// 		document.title = to.meta.title;
// 	}
// 	next();
// });

createApp(App)
	// .use(router)
	.use(pinia)
	.mount('#app');
