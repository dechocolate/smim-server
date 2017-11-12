export default function (nga, admin) {

	var model = admin.getEntity('users');
	// var jobs = admin.getEntity('jobs');

	// /**
	//  *   LIST
	// **/
    model.listView()
		.sortField('created')
        .sortDir('ASC')
		.perPage(30) 
        .title('사용자 목록')
        .fields([
			nga.field('id').isDetailLink(true).label('사용자 코드'),
            nga.field('username').label('이름'),
			nga.field('gender').label('성별'),
			nga.field('birth').label('생년월일'),
			nga.field('available').label('사용가능 여부')
			   .template('<span ng-if="entry.values.available">O</span><span ng-if="!entry.values.available">X</span>'),
			nga.field('leave').label('탈퇴 여부')
				.template('<span ng-if="entry.values.leave">탈퇴</span>'),
			nga.field('created', 'datetime').format('yyyy-MM-dd hh:mm').label('가입 날짜'),
			nga.field('lastLogin', 'datetime').format('yyyy-MM-dd hh:mm').label('마지막 로그인 시간')
		])	
        .listActions(['edit', 'delete']);

    // /**
	//  *   VIEW
	// **/
	model.showView()
	.title('사용자 조회')
	.fields([
		nga.field('id').isDetailLink(true).label('사용자 코드'),
		nga.field('username').label('이름'),
		nga.field('gender').label('성별'),
		nga.field('birth').label('생년월일'),
		nga.field('available').label('사용가능 여부')
		   .template('<span ng-if="entry.values.available">O</span><span ng-if="!entry.values.available">X</span>'),
		nga.field('leave').label('탈퇴 여부')
			.template('<span ng-if="entry.values.leave">탈퇴</span>'),
		nga.field('created', 'datetime').format('yyyy-MM-dd hh:mm').label('가입 날짜'),
		nga.field('lastLogin', 'datetime').format('yyyy-MM-dd hh:mm').label('마지막 로그인 시간')
	]);


	// /**
	//  *   CREATE
	// **/
	model.creationView()
	.title('사용자 생성')
	.fields([            
		nga.field('username').label('아이디'),
		nga.field('password', 'password').label('패스워드'),
		nga.field('username').label('이름'),
		nga.field('gender', 'choice').label('성별')
			.choices([
				{ value: 'm', label: '남성' },
				{ value: 'f', label: '여성' }
			]),
		nga.field('birth', 'date').label('생년월일')
	]);


	// /**
	//  *   EDIT
	// **/
	model.editionView()
	.title('사용자 수정')
	.fields(
		nga.field('id').label('코드').editable(false),
		nga.field('username').label('이메일').editable(false),
		nga.field('password', 'password').label('패스워드'),
		nga.field('companyCEO').label('대표명'),
		nga.field('companyName').label('상호명'),
		nga.field('created', 'datetime').format('yyyy-MM-dd hh:mm').label('가입 날짜').editable(false),
		nga.field('lastLogin', 'datetime').format('yyyy-MM-dd hh:mm').label('마지막 로그인 시간').editable(false),
		nga.field('available', 'choice').label('삭제여부')		
			.choices([
				{ value: true, label: '활성' },
				{ value: false, label: '비활성' }
			]),
		nga.field('available', 'choice').label('삭제여부')		
			.choices([
				{ value: true, label: '활성' },
				{ value: false, label: '비활성' }
			]),		
	);

    return model;
}
