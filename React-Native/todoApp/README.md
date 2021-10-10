### ToDo App 만들기

###### SafeAreaView Component
ios 같은 노치 디자인은 상부까지 차지하므로 자동으로 패딩값을 주어 노치를 차지하지 않게 하는 컴포넌트이다.  

###### StatusBar Component
android에서는 StatusBar 컴포넌트를 설정하지 않으면 화면이 상태바 를 가린다. 상태 바 컴포넌트를 통해 상태 바를 제어할 수 있다.
상태 바 속성은 아래와 같다.
 - barStyle : 상태 바 컨텐츠의 글자 색
 - backgroundColor : 상태 바 배경색으로 안드로이드에서만 작동한다.

###### Dimensions
커스텀 Input 컴포넌트를 만들 때 왜 my를 0으로 할까? 그 이유는 값을 아무리 줘도 작동하지 않기 때문이다.  
우리가 원하는 방식으로 구현하려면 width 값을 설정하고 부모의 정렬방식을 center로 한다면 될 것이다.  
하지만 각 기기의 너비를 어떻게 구할 수 있을까? 답은 Dimensions 모듈이다.  
Dimensions.get('window')를 통해 기기의 화면 크기 정보를 받아올 수 있다.  
하지만 Dimensions는 처음 받아온 값이 자동으로 갱신되지 않기 때문에 기기를 회전하면 맞지 않다.  
이때 useWindowDimensions를 이용해 화면 크기가 변하면(이벤트 발생) Dimensions를 바꿔줄 수 있다.  