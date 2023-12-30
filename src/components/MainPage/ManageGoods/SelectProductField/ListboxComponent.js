import { forwardRef } from "react";

import PropTypes from "prop-types";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

export const ListboxComponent = forwardRef(
  function ListboxComponent(props, ref) {
    const { onBottomScroll, ...restProps } = props;

    const scrollRef = useBottomScrollListener(onBottomScroll, { offset: 200 });

    return (
      <ul
        {...restProps}
        ref={(elRef) => (scrollRef.current = ref.current = elRef)}
      />
    );
  }
);

ListboxComponent.propTypes = {
  onBottomScroll: PropTypes.func
};
