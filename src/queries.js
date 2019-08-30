// export const getServices = `
// {
//   github {
//     repository(name: "infrastructure", owner: "gaslight") {
//       object(expression: "master:services") {
//         ... on GitHub_Tree {
//           id
//           entries {
//             name
//             object {
//               ... on GitHub_Blob {
//                 id
//                 text
//                 oid
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `

// export const handbook = `query MyQuery {
//     github {
//       repository(name: "handbook", owner: "gaslight") {
//         object(expression: "master:") {
//           ... on GitHub_Tree {
//             id
//             entries {
//               name
//               mode
//               object {
//                 ... on GitHub_Tree {
//                   entries {
//                     name
//                     object {
//                       ... on GitHub_Blob {
//                             id
//                           text
//                       }
//                     }
//                   }
//                 }
//                 ... on GitHub_Blob {
//                   id
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }`
