
module.exports = function(app) {

	var Admin = app.models.Admin;
	var Role = app.models.Role;
	var RoleMapping = app.models.RoleMapping;

	Admin.find(function(err, admins){
		if(admins.length === 0){
			createAdmin();
		}
	})

	function createAdmin() {
		Admin.create([
			{username: 'smim', email: 'smim@smim.com', password: 'smim123', available: true}
		], function(err, admins) {
			if (err) throw err;
	
			console.log('Created admins:', admins);
	
			//create the admin role
			Role.create({
				name: 'admin',
				description: 'CMS admin 권한'
			}, function(err, role) {
				if (err) throw err;
	
				console.log('Created role:', role);
	
				//make bob an admin
				role.principals.create({
					// principalType: RoleMapping.ADMIN,
					principalType: RoleMapping.USER,
					principalId: admins[0].id
				}, function(err, principal) {
					if (err) throw err;
	
					console.log('Created principal:', principal);
				});
			});
	
			Role.create({
				name: 'super',
				description: 'CMS 모든 권한'
			}, function(err, role) {
				if (err) throw err;
	
				console.log('Created role:', role);
	
				//make bob an admin
				role.principals.create({
					// principalType: RoleMapping.ADMIN,
					principalType: RoleMapping.USER,
					principalId: admins[0].id
				}, function(err, principal) {
					if (err) throw err;
	
					console.log('Created principal:', principal);
				});
			});
		});		
	}

};
