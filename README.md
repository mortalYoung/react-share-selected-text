# react-share-selected-text

## Introduction

A component that can share selected text.

## Install

```Base
npm install react-share-selected-text
```

```Base
yarn add react-share-selected-text
```

## Usage

```JavaScript
import SharedSelectText from 'react-share-selected-text';
import 'react-share-selected-text/lib/index.min.css';

const App = () => (
  <SharedSelectText buttons={[ icon:'wechat' ]}>
    here is some article texts
  </SharedSelectText>
);
```
| 属性 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| timeout | 浮动框出现的延迟时间 | number | 300 |
| buttons | 设置浮动框上面的按钮 | IButtons[] |  |
| buttonsRender | 浮动框自定义渲染，优先级低于 buttons | JSX.Element | |
| gridWidth | 按钮格子的大小 | number | 30 |
| buttonsClassName | 按钮区域自定义 class | string | |



IButtons 属性如下：
| 属性 | 说明 | 类型 | 默认值 |
| :---- | :---- | :---- | :---- |
| icon | 展示图标,内置有` wechat,twitter,facebook,weibo ` | string | JSX.Element |  |
| onClick | 图标点击事件 | Function | |