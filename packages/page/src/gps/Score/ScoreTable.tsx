import { RootState } from '@pkg/reducer';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

const ScoreTable = () => {
  const score = useSelector((state: RootState) => state.gps.score);

  return (
    <>
      {score.length > 0 ? (
        <>
          <div>
            <table>
              <Colgroup course={['a', 'b']} />
              <thead>
                <CourseName course={['a', 'b']} />
                <HoleList course={['a', 'b']} />
                <ParList course={['a', 'b']} />
              </thead>
              <tbody>
                <ScoreList course={['a', 'b']} />
              </tbody>
            </table>
          </div>
          <div>
            <table style={{ width: '57.95%' }}>
              <Colgroup course={['c']} />
              <thead>
                <CourseName course={['c']} />
                <HoleList course={['c']} />
                <ParList course={['c']} />
              </thead>
              <tbody>
                <ScoreList course={['c']} />
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default ScoreTable;

const Col = () => (
  <>
    <col width="2.5%" />
    <col width="2.5%" />
    <col width="2.5%" />
    <col width="2.5%" />
    <col width="2.5%" />
    <col width="2.5%" />
    <col width="2.5%" />
    <col width="2.5%" />
    <col width="2.5%" />
    <col width="3%" />
  </>
);

const Colgroup = ({ course }: { course: string[] }) => {
  return (
    <colgroup>
      <col width="7%" />
      {course.map((e: string) => (
        <Col key={'col' + e} />
      ))}
      <col width="5%" />
    </colgroup>
  );
};

// 코스 찾기
const findCourse = (name: string) => {
  const courseInfo = useSelector((state: RootState) => state.gps.mapInfo).courseInfo;

  return courseInfo.find((el: any) => el.cour_cd === name);
};

// 코스이름 행
const CourseName = ({ course }: { course: string[] }) => {
  const score = useSelector((state: RootState) => state.gps.score);

  return (
    <tr>
      <th>코스명</th>
      {course.map((e: string, i: number) => {
        const courseName =
          score[0][`course_${e}`] !== 'N' && score[0][`course_${e}`] !== ''
            ? score[0][`course_${e}`]
            : score[0].course_a;

        return (
          <th
            key={'cournm' + e + i}
            colSpan={10}
          >
            {findCourse(courseName).cour_name}
          </th>
        );
      })}
      <th></th>
    </tr>
  );
};

// 홀 리스트 행
const HoleList = ({ course }: { course: string[] }) => {
  return (
    <tr>
      <th>홀(Hole)</th>
      {course.map((e: string) => (
        <Fragment key={`ScoreHoleNo${e}`}>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
          <th>7</th>
          <th>8</th>
          <th>9</th>
          <th>계</th>
        </Fragment>
      ))}
      <th style={{ width: '100px' }}>합계</th>
    </tr>
  );
};

// 파레벨 리스트 행
const ParList = ({ course }: { course: string[] }) => {
  const score = useSelector((state: RootState) => state.gps.score);
  let sum = 0;
  return (
    <tr>
      <th>파(Par)</th>
      {course.map((e: string) => {
        const courseName =
          score[0][`course_${e}`] !== 'N' && score[0][`course_${e}`] !== ''
            ? score[0][`course_${e}`]
            : score[0].course_a;

        const parCont = findCourse(courseName).parinfo.reduce((a: number, b: number) => a + b);
        sum += parCont;
        return (
          <Fragment key={`ScoreParLevel${e}`}>
            {findCourse(courseName).parinfo.map((el: number, i: number) => {
              return <th key={`ScoreParLevel${e + i}`}>{el}</th>;
            })}
            <th>{parCont}</th>
          </Fragment>
        );
      })}
      <th>{sum}</th>
    </tr>
  );
};

// 내장객 스코어
const ScoreList = ({ course }: { course: string[] }) => {
  const score = useSelector((state: RootState) => state.gps.score);

  return score.map((e: any, i: number) => {
    let sum = 0;
    return (
      <tr key={`${e.cust_nm}Score`}>
        <td>{e.cust_nm}</td>
        {course.map((el: string) => {
          const courseName =
            score[0][`course_${el}`] !== 'N' && score[0][`course_${el}`] !== ''
              ? score[0][`course_${el}`]
              : score[0].course_a;

          const parinfo = findCourse(courseName).parinfo;
          const total = e[`score_total_${el}`];
          sum += total;
          return (
            <Fragment key={`playerScoreList${e.cust_nm + el}`}>
              <td>{e[`score_${el}1`] ? e[`score_${el}1`] - parinfo[0] : '-'}</td>
              <td>{e[`score_${el}2`] ? e[`score_${el}2`] - parinfo[1] : '-'}</td>
              <td>{e[`score_${el}3`] ? e[`score_${el}3`] - parinfo[2] : '-'}</td>
              <td>{e[`score_${el}4`] ? e[`score_${el}4`] - parinfo[3] : '-'}</td>
              <td>{e[`score_${el}5`] ? e[`score_${el}5`] - parinfo[4] : '-'}</td>
              <td>{e[`score_${el}6`] ? e[`score_${el}6`] - parinfo[5] : '-'}</td>
              <td>{e[`score_${el}7`] ? e[`score_${el}7`] - parinfo[6] : '-'}</td>
              <td>{e[`score_${el}8`] ? e[`score_${el}8`] - parinfo[7] : '-'}</td>
              <td>{e[`score_${el}9`] ? e[`score_${el}9`] - parinfo[8] : '-'}</td>
              <td>{total}</td>
            </Fragment>
          );
        })}
        <th>{sum}</th>
      </tr>
    );
  });
};
