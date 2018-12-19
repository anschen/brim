const is = Object.is
const keys = Object.keys

export default function shallowDiff(objA, objB) {
  if (is(objA, objB)) {
    return
  }

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    console.log("NOT OBJECTS")
    return
  }

  var keysA = keys(objA)
  var keysB = keys(objB)

  if (keysA.length !== keysB.length) {
    console.log("KEY LENGTH:", keysA.length, keysB.length)
    return
  }

  // Test for A's keys different from B.
  console.group("SHALLOW DIFF")
  for (var i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      console.log(keysA[i], objA[keysA[i]], objB[keysA[i]])
    }
  }
  console.groupEnd()
}