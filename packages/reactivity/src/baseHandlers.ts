import { reactive, ReactiveFlags, reactiveMap } from "./reactive"

const get = createGetter()
const set = createSetter()

function createGetter() { 
  return function get(target, key, receiver) {
    
    const isExistingReactiveMap = () => 
      key === ReactiveFlags.RAW && receiver === reactiveMap.get(target)
    
    
    const res = Reflect.get(target, key, receiver)
    
    if (isExistingReactiveMap()) {
      return target;
    }

    return res;
  }
}

function createSetter() { 
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    // TODO 触发依赖收集
    return result
  }
}

export const mutableHandlers = {
  get,
  set
}