### 스타일링

###### 인라인 스타일링
컴포넌트에 직접 스타일을 입력하는 방식으로 HTML과 다르게 {} 안에 객체를 전달해야 함.  

###### 클래스 스타일링
외부 스타일 객체를 만들어 인라인에 객체를 전달해주는 방식으로 StyleSheet 모듈을 임포트해서 사용한다.

``` js
import { StyleSheet } from 'react-native'

const App = () => {
    return (
        <View style={styles.container}>
            ...
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FFF'
    }
})
```  

###### 한개 이상의 스타일 적용
컴포넌트의 style 프로퍼티에 배열로 스타일 객체를 전달하면 모두 적용할 수 있다. 단 중복된 스타일은 뒤에 오는 스타일 객체로 덮어씌워진다.

``` js
import { StyleSheet } from 'react-native'

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.error]}></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#FFF'
    },
    text : {
        padding : 10,
        fontSize : 26,
        fontWeight : '400',
        color : 'black'
    },
    error : {
        fontWeight : '600',
        color : 'red'
    }
})
```

###### 외부 파일 스타일
StyleSheet.create() 로 생성한 스타일 객체를 export 하고 외부에서 import 하여 사용하면 된다.


##### 리액트 네이티브 스타일 속성
###### flex
플렉스 박스처럼 반응형 컴포넌트를 만들기 위함.  
flex 값을 0을 줄 경우 width와 height에 설정된 값 만큼 차지하게 된다.  
flex 값을 1을 줄 경우 컴포넌트가 차지할수 있는 영역을 모두 차지한다.  like) col-auto col col-auto 에서의 col
flex 값이 양수인 컴포넌트가 여러개 있다면 어떻게 될까. 이럴 경우 flex 값의 비율만큼 영역을 차지하게 된다.
두 개의 컴포넌트의 flex 값이 각각 1, 2 라면 1:2의 비율로 화면을 차지한다.  

##### 정렬

###### flexDirection
컴포넌트를 나열하면 기본적으로 세로로 쌓인다. flexDirection을 설정하면 컴포넌트가 쌓이는 방향을 제어할 수 있다.  
flexDirection의 값은 다음과 같다.
 - column : 세로 방향(Default)
 - column-reverse : 세로 방향 역순 정렬
 - row : 가로 방향 정렬
 - row-reverse : 가로 방향 역순 정렬
flexDirection은 본인이 아닌 자식 컴포넌트에 적용된다.  

###### justifyContent
justifyContent는 flexDirection과 동일한 방향으로 정렬하는 속성이다.  
flexDirection이 column 일 경우 세로 방향 정렬이 되고 row 일 경우 가로 방향 정렬이 된다.  
justifyContent의 값은 다음과 같다.
 - flex-start : 시작점에서 정렬(Default)
 - flex-end : 끝에서부터 정렬
 - center : 중앙 정렬
 - space-between : 컴포넌트 사이의 공간을 동일하게 만들어서 정렬.   like) me-1 me-1 X
 - space-around : 컴포넌트 각각의 주변 공간을 동일하게 만들어서 정렬.   like) mx-1 mx-1 mx-1
 - space-around : 컴포넌트 사이의 양 끝에 동일한 공간을 만들어서 정렬.   like) mx-1 me-1 me-1
justifyContent는 자식 컴포넌트에 적용되는 속성

###### alignItems
justifyContent와 다르게 flexDirection과 수직인 방향으로 정렬하는 속성이다.  
flexDirection이 column 일 경우 가로 방향 정렬이 되고 row 일 경우 세로 방향 정렬이 된다.  
alignItems의 값은 다음과 같다.
 - flex-start : 시작점에서 정렬(Default)
 - flex-end : 끝에서부터 정렬
 - center : 중앙 정렬
 - strech : alignItems 방향으로 컴포넌트 확장. 부모가 차지한 영역만큼 확장하는 것
 - baseline : 컴포넌트 내부의 텍스트 베이스라인을 기준으로 정렬

###### shadow
그림자를 설정하는 속성이다. 아래는 그림자 속성의 내용이다.
 - shadowColor : 그림자 색 설정
 - shadowOffset : {width, height}를 통해 그림자 거리 설정
 - shadowOpacity : 그림자의 불투명도 설정
 - shadowRadius : 그림자의 흐림 반경 설정
하지만 위 속성들은 ios에서만 적용된다. 안드로이드에서는 elevation 속성을 사용해야한다.  
이처럼 플랫폼마다 적용여부가 다른 속성이 존재하는데 Platform 모듈을 통해 각 플랫폼마다 각자 설정을 해줄 수 있다.

``` js
import { ..., Platform } from 'react-native'

export default () => {
    return <View style={styles.shadow}>...</View>
}

const styles = StyleSheet.create({
    shadow : {
        ...,
        ...Platform.select({
            ios : {
                shadowColor : '#000',
                shadowOffset : {
                    width : 10,
                    height : 10
                },
                shadowOpacity : 0.5,
                shadowRadius : 10
            },
            android : {
                elevation : 20
            }
        })
    }
})
```

##### Styled Component
css 처럼 스타일을 적용할 수 있게 해주는 라이브러리이다.  
문법은 styled.Component\`\`로 백틱 안에 스타일을 정의한다.  
또는 css.\`\`로 재사용이 가능한 코드를 만들 수 있다. 또는 완성된 컴포넌트를 상속받아 스타일을 정의할 수 있다.

``` js
import styled, { css } from 'styled-components/native'

const whiteText = css`
    color : #fff;
    font-size : 14px;
`
const MyBoldTextComponent = styled.Text`
    ${whiteText}
    font-weight : 600;
`
const MyLigthTextComponent = styled.Text`
    ${whiteText}
    font-weight : 200;
`
const ErrorText = styled(MyBoldComponent)`
    font-weight : 600;
    color : red;
`
```

###### attrs
컴포넌트 속성을 설정하려면 styled.Compontent.attrs(props => ({style 객체}))`` 로 설정할 수 있다.

``` js
const AttrEx = styled.TextInput.attrs({
    placeholder : 'Enter a input',
    placeholderColor : 'blue'
})

```

###### ThemeProvider
스타일드 컴포넌트의 ThemeProvider를 이용하여 하위 컴포넌트에서 테마 정보에 접근할 수 있다.  
ThemeProvider의 theme 속성에 스타일 객체를 넣어주면 하위 컴포넌트에서 props.theme 로 접근할 수 있다.
