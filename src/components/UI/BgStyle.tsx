import React from 'react';

export default function BgStyle() {
  return (
    <div
      style={{
        zIndex: -99,
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 212, 255)',
        background: 'linear-gradient(to top, #2F80ED, #56CCF2)'
      }}
      className="position-absolute overflow-hidden">
      {squreBackground('45deg', '75px', '-12%', undefined, undefined)}
      {squreBackground('225deg', undefined, undefined, '-12%', '75px')}
    </div>
  );
}

const squreBackground = (
  deg: string,
  topVal?: string | number,
  rightVal?: string | number,
  leftVal?: string | number,
  bottomVal?: string | number
) => {
  return (
    <>
      <div
        style={{
          width: 'auto',
          height: '600px',
          right: rightVal,
          top: topVal,
          bottom: bottomVal,
          left: leftVal,
          columnGap: '10px',
          rowGap: '10px',
          gridTemplateColumns: 'repeat(8,100px)',
          gridTemplateRows: 'repeat(6,100px)',
          transformOrigin: 'center',
          aspectRatio: '1/1',
          rotate: `${deg}`
        }}
        className="position-absolute d-grid">
        <div
          style={{
            gridColumn: '1/ span 2',
            gridRow: 'span 2',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />

        <div
          style={{
            gridColumn: '1',
            gridRow: '3',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '3',
            gridRow: '2',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '1',
            gridRow: '5',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '4',
            gridRow: '5',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '2 / span 2',
            gridRow: '3 / span 2',
            backgroundColor: 'rgba(0,255,0,0.2)'
          }}
        />

        <div
          style={{
            gridColumn: '1',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
        <div
          style={{
            gridColumn: '4 / span 4',
            gridRow: '1 / span 4',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }}
        />
      </div>
    </>
  );
};
