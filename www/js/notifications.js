var ipaddr = 'http://54.226.242.116:8081';

$.ajax({
					url: ipaddr + '/getUserInv',
					type: 'POST',
					async: false,
					data: {"user_id" : localStorage.id},
					success: function(data){
						for(var i = 0; i < data.length; i++){
						
							if (data[i].accepted == 0) {
								var content = 	"<div>" +
												"<p>You have an invitation to group "+data[i].group_name+"</p>" +
												"</div>" +
												"<a id="+data[i].group_id+" data-group-name='"+data[i].group_name+"' class='ui-btn ui-btn-inline ui-icon-plus ui-btn-icon-left ui-corner-all ui-shadow btn-accept'>Accept</a>" +
												"<a id="+data[i].group_id+" data-group-name='"+data[i].group_name+"' class='ui-btn ui-btn-inline ui-icon-minus ui-btn-icon-left ui-corner-all ui-shadow btn-cancel'>Cancel</a>"
								$("#invitations").append(content);
							}
							
							$('.btn-accept').click(function(){
								
								$.ajax({
									url: ipaddr + '/acceptInv',
									type: 'POST',
									async: false,
									data: { "group_id": this.id, "user_id" : localStorage.id, "group_name" : $(this).attr('data-group-name')},
									success: function(data) {},
									error: function(e) { alert(e.message) }
								});
								
							});
							
							$('.btn-cancel').click(function(){
								$.ajax({
									url: ipaddr + '/cancelInv',
									type: 'POST',
									async: false,
									data: { "group_id": this.id, "user_id" : localStorage.id, "group_name" : $(this).attr('data-group-name')},
									success: function(data) {},
									error: function(e) { alert(e.message) }
								});
							});
							
							
							
							
							
						}
					},
					error: function(e){alert(e.message)}
});