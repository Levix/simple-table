import { inject, provide } from 'vue'

export interface FunctionalStore<T extends object> {
	(...args: any[]): T
	token: Symbol
	root?: T
}

export type InjectType = 'optional' | 'root'

export function useProvider<T extends object>(func: FunctionalStore<T>): T {
	!func.token && (func.token = Symbol('functional store'))
	const depends = func()
	provide(func.token, depends)
	return depends
}

// 可以一次传入多个hook函数， 统一管理
export function useProviders(...funcs: FunctionalStore<any>[]) {
	funcs.forEach(func => {
		!func.token && (func.token = Symbol('functional store'))
		provide(func.token, func())
	})
}

//接收第二个参数，'root'表示直接全局使用；optional表示可选注入，防止父组件的provide并未传入相关hook
export function useInjector<T extends object>(func: FunctionalStore<T>, type?: InjectType) {
	const token = func.token
	const root = func.root
	switch (type) {
		case 'optional':
			return inject<T>(token) || func.root || null
		case 'root':
			if (!func.root) func.root = func()
			return func.root
		default:
			if (inject(token)) {
				return inject<T>(token)
			}
			if (root) return func.root
			throw new Error(`状态钩子函数${func.name}未在上层组件通过调用useProvider提供`)
	}
}
