import { GpsBlockParProps } from '@pkg/types';

export const BlockPar = ({ blockRef, course, hole, section }: GpsBlockParProps) => {
  return (
    <div className="par">
      {section.map(el => {
        // 코스데이터가 없으면 빈 배열
        if (!blockRef.current[course.charCodeAt(0) - 65]) blockRef.current[course.charCodeAt(0) - 65] = [];
        if (!blockRef.current[course.charCodeAt(0) - 65][Number(hole) - 1])
          // 홀데이터가 없으면 빈 배열
          blockRef.current[course.charCodeAt(0) - 65][Number(hole) - 1] = [];

        return (
          <div
            key={el}
            className={el}
            ref={(
              ref // 배열에 추가
            ) => (blockRef.current[course.charCodeAt(0) - 65][hole - 1][Number(el.slice(-1))] = ref)}
          ></div>
        );
      })}
    </div>
  );
};
