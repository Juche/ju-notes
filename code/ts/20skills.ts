/**
 * @TS 重点
 * ! 只有数字枚举成员才会有反向映射，字符串或其它值是没有的
 * ! 字符串枚举是没有递增的，当前的枚举成员前一个值为字符串，那么当前的枚举对象如果不赋值就会报错
 */

interface Person {
  name: string;
  sex: string;
  age?: number;
  addr?: string;
}

// 1.使用显式类型而不是“any”
// 尽可能避免使用 any 类型，因为它会破坏 TypeScript 的优势。相反，显式定义变量、函数和参数的类型。
function add(a: number, b: number): number {
  return a + b;
}

// 2. 在 tsconfig.json 中启用“严格”模式
// 启用“严格”模式可确保 TypeScript 执行广泛的类型检查，从而在开发过程的早期捕获潜在的错误。

// 3.使用只读数组
// 利用只读来防止对对象和数组的意外修改。
const person = <Readonly<Person>>{
  name: 'Juching',
  sex: 'male',
};
// person.name = 'Juche';

const months = <Readonly<number[]>>[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// months.push(13);

// 4. 使用解构来提取属性
// 解构可以使您的代码更简洁、更易于阅读。
function getPerson({ name, sex }: Person) {
  console.log(`🚀 ~ getPerson ~ name: ${name} - ${sex}`);
}
getPerson(person);

// 5. 数组泛型优于类型转换
// 使用数组泛型来指定数组中元素的类型，而不是类型转换。
const numbers = <number[]>[1, 2, 3];
const firstNum = <number>numbers[0];

// 6. 使用枚举作为常量
// 使用枚举来表示一组相关常量，以提高代码的可读性和可维护性。
enum Seasons {
  spring = '春',
  summer = '夏',
  autumn = '秋',
  winter = '冬',
}
console.log(`🚀 ~ Seasons.spring:`, Seasons.spring);
// console.log(`🚀 ~ Seasons['春']:`, Seasons['春']);  // 错误取值

enum Gender {
  male = 1,
  female,
}
console.log(`🚀 ~ Gender.female:`, Gender.female);
console.log(`🚀 ~ Gender[1]:`, Gender[1]);

// 7. 对于对象形状，优先选择接口而不是类型别名
// 在定义对象的形状时使用接口来利用其可扩展性。
// type Person1 = {
interface Person1 {
  name: string;
  age: number;
}

// 8. 对可配置对象使用可选属性
// 在接口中使用可选属性可以在配置对象时实现灵活性。

// 9. 使用 TypeScript 的实用类型
// 利用 TypeScript 的内置实用程序类型（例如 Partial、Pick 和 Omit）来避免不必要的重复并简化代码。
type PartialPerson = Partial<Person>; // Makes all properties optional
type PersonName = Pick<Person, 'name'>; // Extracts a subset of properties
type PersonWithoutAge = Omit<Person, 'age'>; // Removes a property

// 10. 对多种可能的类型使用联合类型
// 使用联合类型指定一个变量可以保存多种类型的值。
function formatInput(input: string | number) {
  return `Input: ${input}`;
}

// 11.利用交叉类型来组合类型
// 使用交集类型将多种类型合并为单一类型。
interface Shape {
  color: string;
}

interface Circle {
  radius: number;
}

interface Rectangle {
  width: number;
  height: number;
}

type RedCircle = Shape & Circle;
type RedRectangle = Shape & Rectangle;

const redCircle: RedCircle = { color: 'red', radius: 5 };
const redRectangle: RedRectangle = { color: 'red', width: 10, height: 20 };

// 12. 使用类型保护进行类型断言
// 使用类型保护来缩小条件块中变量的类型范围。
function formatValue(value: string | number): string {
  if (typeof value === 'number') {
    return value.toFixed(2);
  } else if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    throw new Error('Invalid value');
  }
}

// 13.更喜欢函数式编程技术
// 利用函数式编程技术（例如不变性和纯函数）来提高代码清晰度并减少副作用。

// 14. 使用空合并运算符 (??)
// 空值合并运算符 (??) 提供了一种处理空值或未定义值的简洁方法。
const value = 0;
const defaultValue = value ?? 1;

// 15. 使用可选链接 (?.)
// 可选链接 (?.) 简化了对可能未定义或为 null 的对象属性的访问。

// 16.杠杆类型推断
// 利用 TypeScript 的类型推断功能来避免冗余的类型注释。

// 17.避免深层嵌套
// 利用 TypeScript 的类型推断功能来避免冗余的类型注释。

// 18.遵循一致的命名约定
// 遵守变量、函数和类的一致命名约定，以提高代码的可读性。使用传达实体目的的描述性名称。

// 19. 模块化你的代码
// 将代码分解为更小的模块，每个模块负责特定的功能。这提高了可重用性和可维护性。

// 20.写下清晰简洁的评论
// 添加注释来解释复杂的算法、重要的决策或边缘情况。避免仅仅重述代码的过多注释。

// 总结
// 编写清晰高效的 TypeScript 代码需要练习、注重细节并遵守最佳实践。
// 本文分享的20个技巧，将能够帮助您生成更易于理解、维护和扩展的高质量代码。
