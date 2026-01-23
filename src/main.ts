import { createApp } from 'vue';
import App from './App.vue';
import PlanetPage from './PlanetPage.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { createPinia } from 'pinia';

const pinia = createPinia();

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: PlanetPage,
	},
	{
		path: '/blog',
		component: () => import('./pages/BlogPage.vue'),
	},
	{
		path: '/blog/:article',
		component: () => import('./pages/BlogArticlePage.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

createApp(App)
	.use(router)
	.use(pinia)
	.mount('#app');
