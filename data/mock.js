const data = [
    {
      id: 1,
      title: '트랜잭션이란?',
      description : '트랜잭션이란 데이터베이스의 상태를 변화시키는 일의 단위이다.\
      트랜잭션을 보장하기 위해서는 ACID조건을 만족해야 한다.',
      category : '데이터베이스',
      createdAt: new Date('2023-03-23T06:34:07.617Z'),
      updatedAt: new Date('2023-03-23T06:34:07.617Z'),
    },
    {
      id: 2,
      title: 'OSI 7계층',
      description: 'OSI 7계층에는 응용계층, 표현계층, 세션 계층, 전송 계층, 네트워크 계층, 데이터 링크 계층, 물리 계층이 있다.',
      category : '네트워크',
      createdAt: new Date('2023-03-23T06:34:08.617Z'),
      updatedAt: new Date('2023-03-23T06:34:08.617Z'),
    },
    {
      id: 3,
      title: '프로세스와 스레드의 차이',
      description : '프로세스는 운영체제로부터 시스템 자원을 할당받는 작업의 단위로, 실행되고 있는 프로그램의 인스턴스이다. \
       스레드는 프로세스가 할당받은 자원을 이용하는 더 작은 실행단위이다.',
       category : '운영체제',
      createdAt: new Date('2023-03-23T06:34:09.617Z'),
      updatedAt: new Date('2023-03-23T06:34:09.617Z'),
    },
    {
      id: 4,
      title: 'HTTP와 HTTPS의 차이',
      description: 'HTTP란 서버/클라이언트 모델을 따라 데이터를 주고받기 위한 프로토콜이다. \
      HTTPS는 HTTP에 데이터 암호화가 추가된 프로토콜이다. 네트워크 상에서 중간에 제3자가 정보를 볼 수 없도록 공개키 암호화를 지원하고 있다.',
      category : '네트워크',
      createdAt: new Date('2023-03-23T06:34:10.617Z'),
      updatedAt: new Date('2023-03-23T06:34:10.617Z'),
    },
    {
      id: 5,
      title: 'CORS는 무엇인가',
      description: '교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)는 추가 HTTP 헤더를 사용하여, \
      한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제이다.',
      category : '네트워크',
      createdAt: new Date('2023-03-23T06:34:11.617Z'),
      updatedAt: new Date('2023-03-23T06:34:11.617Z'),
    },
  ];
  
  export default data;
  