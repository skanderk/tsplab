/*
 * @Author: Skander Kort 
 * @Date: 2025-12-15 02:41:25 
 * @Last Modified by:   Skander Kort 
 * @Last Modified time: 2025-12-15 02:41:25 
 */

import { mount } from 'svelte'
import './styles/app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app


