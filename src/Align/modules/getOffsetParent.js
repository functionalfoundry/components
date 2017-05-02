import utils from './utils'

const getOffsetParent = element => {
  /*
   <div style="width: 50px;height: 100px;overflow: hidden">
   <div style="width: 50px;height: 100px;position: relative;" id="d6">
   </div>
   </div>
   */
  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
  //  In other browsers it only includes elements with position absolute, relative or
  // fixed, not elements with overflow set to auto or scroll.
  //        if (UA.ie && ieMode < 8) {
  //            return element.offsetParent;
  //        }
  const doc = element.ownerDocument
  const body = doc.body
  let parent
  let positionStyle = utils.css(element, 'position')
  const skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute'

  if (!skipStatic) {
    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode
  }

  for (
    parent = element.parentNode;
    parent && parent !== body;
    parent = parent.parentNode
  ) {
    positionStyle = utils.css(parent, 'position')
    if (positionStyle !== 'static') {
      return parent
    }
  }
  return null
}

export default getOffsetParent
