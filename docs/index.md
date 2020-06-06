# react-share-selected-text

## Usage

```jsx
/**
 * title: 基本
 * desc: 最简单的用法
 */
import react from 'react';
import SharedSelectText from 'react-share-selected-text';
export default () => (
  <SharedSelectText buttons={[{ icon: 'wechat' }, { icon: 'twitter' }]}>
    here is some article texts
  </SharedSelectText>
);
```

```jsx
/**
 * title: 绑定点击事件
 * desc: 为 `icon` 添加点击事件
 */
import react from 'react';
import SharedSelectText from 'react-share-selected-text';
export default () => (
  <SharedSelectText
    buttons={[{ icon: 'wechat', onClick: () => console.log('I am clicked') }]}
  >
    here is some article texts
  </SharedSelectText>
);
```

```jsx
/**
 * title: 设置 grid 大小
 * desc: 为 `icon` grid 设置大小
 */
import react from 'react';
import SharedSelectText from 'react-share-selected-text';
export default () => (
  <SharedSelectText gridSize={36} buttons={[{ icon: 'wechat' }]}>
    here is some article texts
  </SharedSelectText>
);
```

```jsx
/**
 * title: 自定义内容
 * desc: 可以自定义 `render` 的内容
 */
import react from 'react';
import SharedSelectText from 'react-share-selected-text';
export default () => (
  <SharedSelectText
    buttonsRender={
      <div style={{ padding: '0 10px' }}>I am rendered in DIY</div>
    }
  >
    here is some article texts
  </SharedSelectText>
);
```
