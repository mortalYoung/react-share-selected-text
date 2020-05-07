import React, {useEffect, useRef, useState, CSSProperties} from 'react';
import classnames from 'classnames';
import {Weibo, Wechat, Twitter, Facebook} from './icon';
import {getSelectedText} from './utils';
import * as styles from './index.css';
const innerButtons: {[key: string]: JSX.Element | null} = {
	weibo: <Weibo />,
	facebook: <Facebook />,
	wechat: <Wechat />,
	twitter: <Twitter />,
};
interface ButtonProps {
	icon: string | JSX.Element;
	onClick?: () => void;
}
interface ShareSelectedProps {
	children: JSX.Element;
	timeout?: number;
	buttons?: ButtonProps[];
	buttonsRender?: JSX.Element;
	gridWidth?: number;
	buttonsClassName?: string;
}
const SharedSelectText = ({
	children,
	timeout = 300,
	buttons,
	buttonsRender,
	gridWidth = 30,
	buttonsClassName,
}: ShareSelectedProps): JSX.Element => {
	const slotRef = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);
	const [position, setPosition] = useState({top: 0, left: 0});
	const updatePosition = (rect: DOMRect): void => {
		const refRect = slotRef.current
			? slotRef.current.getBoundingClientRect()
			: new DOMRect(0);
		const top = rect.top - refRect.top;
		const left = rect.left + rect.width / 2 - refRect.left;
		setPosition({top, left});
		window.setTimeout(() => {
			setVisible(true);
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
		}
	};
	const renderButtons = (): JSX.Element[] | JSX.Element => {
		if (Array.isArray(buttons) && buttons.length) {
			return buttons.map((item, index) => {
				if (typeof item.icon === 'string') {
					return (
						<div
							className={styles['shared-button']}
							onClick={item.onClick}
							key={item.icon}>
							{innerButtons[item.icon]}
						</div>
					);
				} else {
					return (
						<div
							className={styles['shared-button']}
							onClick={item.onClick}
							key={index}>
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
	const buttonsStyle = (): CSSProperties => {
		if (Array.isArray(buttons) && buttons.length) {
			return {
				gridTemplateColumns: `repeat(${buttons.length},${gridWidth}px)`,
			};
		} else {
			return {};
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
					!visible && styles.visible,
				)}
				style={{
					...position,
				}}>
				<div
					className={classnames(styles['shared-buttons'], buttonsClassName)}
					style={buttonsStyle()}>
					{renderButtons()}
				</div>
			</div>
			{children}
		</article>
	);
};
export default SharedSelectText;
