
export const complianceResultTrue = [true, true, true, true, true];

// // Not compliant
// export const memberResultFalse = {
//     _id: 'aab-d41f1204-81c2-464d-a06a-dd2ea09512eb-aab-0',
//     measurementType: 'aab',
//     memberId: 'aab-d41f1204-81c2-464d-a06a-dd2ea09512eb',
//     timeStamp: '2025-01-16T19:49:25.983Z',
//     coverage: [
//         {
//             status: {
//                 value: 'active'
//             },
//             type: {
//                 coding: [
//                     {
//                         system: {
//                             value: 'https://terminology.hl7.org/CodeSystem/v3-ActCode'
//                         },
//                         code: {
//                             value: 'HMO'
//                         },
//                         display: {
//                             value: 'Health Maintenance Organization Policy'
//                         }
//                     }
//                 ]
//             },
//             subscriber: {
//                 reference: {
//                     value: 'Patient/aab-d41f1204-81c2-464d-a06a-dd2ea09512eb'
//                 }
//             },
//             beneficiary: {
//                 reference: {
//                     value: 'Patient/aab-d41f1204-81c2-464d-a06a-dd2ea09512eb'
//                 }
//             },
//             relationship: {
//                 coding: [
//                     {
//                         code: {
//                             value: 'self'
//                         }
//                     }
//                 ]
//             },
//             period: {
//                 start: {
//                     value: '2024-01-16'
//                 },
//                 end: {
//                     value: '2026-01-16'
//                 }
//             },
//             payor: [
//                 {
//                     reference: {
//                         value: 'Organization/3'
//                     }
//                 }
//             ],
//             id: {
//                 value: '0a6bf918-b968-4484-9b78-4875bbdcbb52'
//             }
//         }
//     ],
//     providers: [
//         {
//             reference: 'Organization?identifier=71533123',
//             display: 'Springfield Hospital'
//         },
//         {
//             reference: 'Practitioner?identifier=1143',
//             display: 'Dr. Marc Weber, General Practitioner'
//         }
//     ],
//     'aab-d41f1204-81c2-464d-a06a-dd2ea09512eb': {
//         'Initial Population': ['2025-01-14'],
//         Exclusions: [],
//         Denominator: ['2025-01-14'],
//         Numerator: [],
//         id: 'aab-d41f1204-81c2-464d-a06a-dd2ea09512eb'
//     }
// };
export const complianceResultFalse = [false];
