import React, { useEffect, useRef, useState, CSSProperties } from 'react';
import classnames from 'classnames';
import { Weibo, Wechat, Twitter, Facebook } from './icon';
import { getSelectedText } from './utils';
import * as styles from './index.less';

interface ButtonProps {
  icon: string | JSX.Element;
  onClick?: () => void;
}
interface ShareSelectedProps {
  children: JSX.Element;
  timeout?: number;
  buttons?: ButtonProps[];
  buttonsRender?: JSX.Element;
  gridSize?: number;
  buttonsClassName?: string;
  onShow?: () => void;
  onHide?: () => void;
}
/**
 * 内置的 SVG Icon
 * @param name
 * @param size
 */
const getButtons = (name: string, size?: number): JSX.Element | null => {
  const innerButtons: { [key: string]: JSX.Element | null } = {
    weibo: <Weibo size={size} />,
    facebook: <Facebook size={size} />,
    wechat: <Wechat size={size} />,
    twitter: <Twitter size={size} />,
  };
  return innerButtons[name];
};
/**
 * 获取 buttons 的样式
 * @param buttons
 * @param gridSize
 */
const buttonsStyle = (
  buttons: ButtonProps[] = [],
  gridSize: number,
): CSSProperties => {
  if (Array.isArray(buttons) && buttons.length) {
    return {
      gridTemplateColumns: `repeat(${buttons.length},${gridSize}px)`,
      gridTemplateRows: gridSize,
    };
  } else {
    return {};
  }
};
/**
 * 渲染 buttons
 * @param buttons
 * @param gridSize
 * @param buttonsRender
 */
const renderButtons = (
  buttons: ButtonProps[] = [],
  gridSize: number,
  buttonsRender?: JSX.Element,
): JSX.Element[] | JSX.Element => {
  if (Array.isArray(buttons) && buttons.length) {
    return buttons.map((item, index) => {
      if (typeof item.icon === 'string') {
        return (
          <div
            className={styles['shared-button']}
            onClick={item.onClick}
            key={item.icon}
          >
            {getButtons(item.icon, gridSize - 10)}
          </div>
        );
      } else {
        return (
          <div
            className={styles['shared-button']}
            onClick={item.onClick}
            key={index}
          >
            {item.icon}
          </div>
        );
      }
    });
  } else if (buttonsRender) {
    return <>{buttonsRender}</>;
  }
  return <div className={styles['empty-data']}>No Data</div>;
};
const SharedSelectText = ({
  children,
  timeout = 150,
  buttons,
  buttonsRender,
  gridSize = 30,
  buttonsClassName,
  onShow,
  onHide,
}: ShareSelectedProps): JSX.Element => {
  const slotRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const updatePosition = (rect: DOMRect): void => {
    const refRect = slotRef.current
      ? slotRef.current.getBoundingClientRect()
      : new DOMRect(0);
    const top = rect.top - refRect.top;
    const left = rect.left + rect.width / 2 - refRect.left;
    setPosition({ top, left });
    window.setTimeout(() => {
      setVisible(true);
      if (onShow) {
        onShow();
      }
    }, timeout);
  };
  const updateShared = (): void => {
    const selected = getSelectedText();
    if (
      selected.text.trim().length &&
      selected.selection.containsNode(slotRef.current as Node, true)
    ) {
      const oRange = selected.selection.getRangeAt(0);
      const oRect = oRange.getBoundingClientRect();
      updatePosition(oRect);
    } else {
      setVisible(false);
      if (onHide) {
        onHide();
      }
    }
  };
  useEffect(() => {
    document.body.addEventListener('mouseup', updateShared);
    return (): void =>
      document.body.removeEventListener('mouseup', updateShared);
  }, [slotRef.current]);
  return (
    <article ref={slotRef} className={styles['shared-warpped']}>
      <div
        className={classnames(
          styles['shared-container'],
          buttonsClassName,
          !visible && styles.visible,
        )}
        style={{
          ...position,
        }}
      >
        <div
          className={classnames(styles['shared-buttons'])}
          style={buttonsStyle(buttons, gridSize)}
        >
          {renderButtons(buttons, gridSize, buttonsRender)}
        </div>
      </div>
      {children}
    </article>
  );
};
export default SharedSelectText;
