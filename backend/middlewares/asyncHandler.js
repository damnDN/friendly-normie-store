const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

//An example of closure
const fA = () => {
  let a = 0;
  return () => {
    return a + 1;
  };
};

const fB = fA();
fB();
fB();
// console.log(fB());
