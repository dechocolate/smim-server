export default function (nga, admin) {
	return nga.menu()
		.addChild(nga.menu(admin.getEntity('users')).title('사용자 목록')
			.icon('<span class="glyphicon glyphicon-user"></span>'))
		;
}
