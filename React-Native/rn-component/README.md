# RN - Component

### JSX - Javascript XML

##### 하나의 부모
JSX는 여러개의 요소를 표현할 경우 반두시 하나의 부모로 감싸야함.  

``` js
return(
    <Text> ...</Text>
    <StatusBar />
) // 두개의 요소를 반환했으므로 에러

return(
    <View>
        <Text> ...</Text>
        <StatusBar />
    </View>
) // View라는 부모로 감싸 반환했으므로 작동
```


cf) View 컴포넌트 : HTML에서의 div 태그


##### Fragment
요소를 View(like div) 컴포넌트로 감싸지 않고 반환하고 싶다면 Fragment 컴포넌트를 사용한다.  
사용시 React 모듈에서 임포트 후 사용하거나 축약 문법인 <></>를 사용하면 된다.  

``` js
return(
    <Fragment> or <>
        <Text> ...</Text>
        <StatusBar />
    </Fragment> or </>
)
```


##### 자바스크립트 변수
{} 안에 동적으로 자바스크립트 변수를 사용할 수 있다.


##### 조건문
JSX 내부에서 if를 사용하려면 {} 안에 즉시실행함수로 값을 반환해야한다.  
하지만 매우 지저분해지므로 JSX 외부에서 조건에 따라 값을 지정하거나 삼항연산자를 이용한 조건문을 사용하는것이 좋다.  

``` js
return(
    <View>
        <Text>
            {( () => {
                if(name === 'hanbit') return 'hanbit'
                else if(name === 'tkppp') return 'tkppp'
                else return 'react native'
            })}
        </Text>
    </View>
)
```


##### AND, OR 연산자.
AND, OR 연산의 특성을 이용해 렌더링을 제어할 수 있다.

``` js
return(
    <View>
        <Text>
            {name === 'tkppp' && (
                <Text>My name is tkppp</Text>
            )}
            {name === 'tkppp' || (
                <Text>My name is anonymous</Text>
            )}
        </Text>
    </View>
)
```


##### null과 undefined
JSX는 null은 허용하지만 undefined는 허용하지 않고 에러를 뿜는다.  


##### 주석
JSX 내에서는 {/\*\*/}를 통해 주석을 작성한다.  
단 태그 안에서 주석을 사용할 경우 자바스크립트와 동일하게 //나 /\*\*/를 사용한다.  


##### 스타일링
인라인 스타일 적용은 태그내 스타일 프로퍼티에 스타일에 관한 객체를 작성하면 된다. 단 {} 안에 객체를 또 넣어주는 것.  
'-'가 들어가는 스타일의 경우 카멜케이스로 바꿔서 넣으면 된다.  

``` js
return(
    <View>
        <Text style={{
            flex : 1,
            backgroundColor : '#fff',
            alignItems : 'center',
            justifyContent : 'center'
        }}>
            ...
        </Text>
    </View>
)
```


##### 컴포넌트
리액트 네이티브에서 컴포넌트는 재사용이 가능한 조립 블록으로 화면에 나타나는 UI 요소이다.  

###### Button
리액트에서 제공하는 컴포넌트로 버튼을 만들떄 사용한다.  
title 프로퍼티로 버튼을 나타낼 이름을 설정하며 onPress 프로퍼티에 버튼 클릭시 수행될 콜백을 넘겨준다.  
Button 컴포넌트는 IOS와 Android에서 다르게 나타나는데 이는 스타일이 IOS와 Android에서 다르기 때문인다.  

##### 커스텀 컴포넌트
커스텀 컴포넌트를 만들때 부모에서 하위 컴포넌트로 값을 넘겨주려면 key="value" 형식으로 인라인으로 넘겨주거나 태그 안쪽에 값을 넘겨줄수 있다.  
자식 컴포넌트로 전달된 값은 컴포넌트의 props 인자로 넘겨받을수 있고 태그 안쪽에 넘겨진 값은 props.children으로 전달된다.  

props의 디폴트값도 설정할수 있는데 Component.defaultProps = {...} 로 설정할수 있다.  
props의 타입도 정의할수 있는데 이는 외부 라이브러리인 prop-types를 설치해야한다.  
설정방법은 Component.propTypes = { properyName : PropTypes.number } 이다.  
또 .isRequired 를 붙혀 프로퍼티의 필수 여부를 지정할수 있다.  

###### state
부모에게 전달받은 props는 수정이 불가능하다. state는 컴포넌트 내부에서 생성되고 값을 변경할 수 있으며 state가 변한다면 컴포넌트는 다시 렌더링된다.  
useState는 컴포넌트 내에서 상태관리할 변수와 세터함수를 배열로 반환한다.  
관리할 상태마다 useState를 사용해 만들어주면 된다.  
``` js
const [count, setCount] = useState(initValue)
```

##### 이벤트

###### press
화면을 터치했을때 나타나는 이벤트로 4가지 종류가 있다.
 - onPressIn : 터치가 시작될 때 호출
 - onPressOut : 터치가 해제될 때 호출
 - onPress : 터치가 해제될 떄 onPressOut 이후 호출
 - onLongPress : 터치가 일정 시간 이상 지속되면 호출


###### change
변화를 감지하는 이벤트로 값을 입력하는 TextInput 컴포넌트에서 많이 사용된다.  
 - onChange = callback(event) : 값이 변화하면 event.nativeEvent 객체를 통해 변화된 정보를 얻을수 있다.
 - onChangeText = callback(text) : 변화한 값만 필요한 경우 사용하면 된다.

``` js
const EventInput = () => {
    const [text, setText] = useState('')
    const _onChange = (event) => setText(event.nativeEvent.text)
    return (
        <View>
            <Text>Input : {text}</Text>
            <TextInput onChange={_onChange} />
        </View>
    )
}
```
