const isWindow = (obj) =>
  obj != null && obj == obj.window // eslint-disable-line eqeqeq

export default isWindow
