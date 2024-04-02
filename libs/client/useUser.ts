import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// me.tsx 에서 리턴되는 유저 정보들을 컴포넌트들로 내보내는 함수

export default function useUser() {
  // useState, useEffect를 사용하여 유저 정보를 가져오는 함수는 캐싱 기능을 제공하지 않음.
  // 그래서 다른 페이지에 갔다 돌아와도 다시 데이터를 불러오게 됨.
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/users/me")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace("/enter");
          // return router.push("/enter");

          // replace vs push :
          // replace는 뒤로가기 했을 때 이전 페이지에 대한 히스토리가 남겨져 있지 않으므로 돌아가지 않음,
          // push는 이전 페이지에 대한 히스토리가 남겨저 이전 페이지로 돌아갈 수 있음
        }
        setUser(data.profile);
      });
  }, [router]);

  return user;
}
