import { useState } from "react";

interface MutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type Mutation<T> = [(data: any) => void, MutationState<T>];

export default function useMutation<T>(url: string): Mutation<T> {
  const [state, setState] = useState<MutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}

// useMutation은 클라이언트 측에서 사용자의 인터랙션(예: 폼 제출)에 따라 서버로 데이터를 비동기적으로 보내고, 그 과정에서의 상태(로딩, 성공, 오류)를 관리하는 것을 도와주는 React 훅입니다.
