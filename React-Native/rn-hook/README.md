###### useState
useState를 이용한 상태 관리는 두가지 방법이 있다.  
1. 세터함수에 변경할 값을 인자로 넘기는 방법.
2. 세터함수에 함수를 인자로 넘기는 방법.
useState는 비동기로 작동하기 때문에 값이 변경되기 전에 또다시 세터함수를 호출하는  
공유자원의 문제가 발생할 수 있다. 이때 2번째 방법을 쓰면 이를 막을 수 있다.  

useState((previosValue) => setValue(previousValue + 1))  

###### useEffect
useEffect는 컴포넌트가 렌더링 될 때마다 원하는 작업이 실행되도록 설정할 수 있는 기능으로 아래와 같이 사용 가능하다.  
useEffect(() => {}, [])  

첫번째 인자는 조건을 만족할 때 마다 호출되고 두번째 파라미터로 함수가 호출되는 조건을 설정할 수 있다.  
두번째 인자를 설정하지 않으면 렌더링 시마다 함수가 실행된다.
