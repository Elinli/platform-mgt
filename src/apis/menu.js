import { _axios } from '@/utils/http';

export function loginApi(data, custNo) {
    console.log(data);
    return _axios.request(
        {
            url: '/login',
            method: 'POST',
            params: { data, custNo },
        },
        {
            errorMessageMode: 'modal',
        }
    );
}

// export const accountInfoApi = () => {
//     return _axios.request < GetAccountInfoModel > ({
//         url: Api.GetUserInfoById,
//         method: 'POST',
//         params: {
//             userId: 'sdadasdasd001',
//             userNm: '24234sadfsdf',
//         },
//     });
// };

// export function getUserInfoById(params: GetUserInfoByUserIdParams) {
//     return _axios.request < GetUserInfoByUserIdModel > ({
//         url: Api.GetUserInfoById,
//         method: 'GET',
//         params,
//     });
// }
