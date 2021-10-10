/**
 * Jest : 테스트용 패키지
 * 
 * expect(검증대상).testMatcher()
 * 
 * testMatcher : 검증 대상을 테스트할 방식
 * toBe(primitive) : 객체가 아닌 원시 타입 값을 비교할 때 사용
 * toEqual(object) : 객체를 비교하기 위한 매쳐
 * toBeTruthy(), toBeFalsy() : 참 거짓을 비교하기 위해 사용
 * toHaveLength(len), toContain() : 배열에 대해 검증할 때 배열의 길이, 배열에 어떤 원소가 포함됐는지 여부를 확인할 때 사용
 * toMatch(reqExp) : 문자열 검증시 정규표현식으로 비교하기 위해 사용
 * toThrow() : 예외 발생 여부 테스트
 * toBeCalledWith(args) : mock 함수가 args를 인자로 받아 호출 되었는지 확인
 * toBeCalledTimes() : mock 함수가 몇번 호출되었는지 체크
 * 
 * describe() : 테스트 그룹화
 * 
 * 모킹 : 테스트에 필요한 가짜 함수와 객체를 만드는 것
 * jest.fn(callback) : 가짜 함수를 만드는 메서드. callback에 반환값을 지정 가능
 * 
 * 
 */