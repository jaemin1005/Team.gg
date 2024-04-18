// const apiUrl =
//   "https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/%ED%84%B0%EA%B2%80%EB%8B%88/kr1?api_key=RGAPI-70a9ac3c-1ee7-4562-bd2a-e71113b73487";

// const getData = async () => {
//   const res = await fetch(apiUrl);
//   const data = await res.json();
//   console.log(data);
// };

// getData();

// fetch(apiUrl).then(function (response) {
//   console.log(response);
//   return response.json();
// });
// console.log(fetch(apiUrl).then((Response) => console.log(Response)));

// fetch(apiUrl)
//   .then((response) => console.log("response:", response))
//   .catch((error) => console.log("error:", error));

// // fetch를 이용하여 JSON 데이터를 가져오고, 성공 또는 실패에 따라 처리합니다.
// fetch(apiUrl)
//   .then((res) => {
//     // HTTP 응답 코드가 200 OK인 경우에만 데이터를 반환합니다.
//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     console.log(response.json());
//     return response.json(); // JSON 데이터를 반환합니다.
//   })
//   .then((data) => {
//     // 성공적으로 데이터를 가져왔을 때의 동작
//     console.log("Fetched Data:", data);
//   })
//   .catch((error) => {
//     // Promise 체인에서 어떤 이유로든 에러가 발생했을 때 동작
//     console.error("Error:", error.message);
//   });
