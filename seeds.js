var mongoose = require("mongoose"),
	University = require("./models/university"),
	Comment = require("./models/comment");

var data = [
	{
		name: "Concordia University",
		image:
			"http://www.concordia.ca/content/concordia/en/offices/ci/_jcr_content/content-main/image_506066488.img.jpg/1518021079222.jpg",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum magna ac tincidunt tincidunt. Pellentesque pulvinar cursus sem, eget mattis erat efficitur in. Cras vestibulum odio nibh. Nullam finibus viverra velit, ac scelerisque lorem sodales sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer volutpat malesuada nisl, vel egestas tortor lobortis nec. Curabitur est nulla, ultrices vitae augue a, mattis commodo est. Vestibulum facilisis fringilla tincidunt. Quisque augue tellus, porta a sagittis nec, tincidunt eu eros. Praesent nec facilisis purus. Integer porttitor gravida imperdiet. Maecenas viverra magna vitae sapien tincidunt, a tempor dui aliquet. Vivamus mattis leo urna, ac volutpat felis mattis et. Cras a justo porta, lobortis eros vitae, interdum est. Vivamus vel elit semper, rutrum arcu sed, ultricies ipsum.",
	},
	{
		name: "McGill University",
		image:
			"https://cdn.mtlblog.com/uploads/288462_c6e337d8cf4b1b64f3a5635ae02a23f8a7fb3521.jpg_facebook.jpg",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum magna ac tincidunt tincidunt. Pellentesque pulvinar cursus sem, eget mattis erat efficitur in. Cras vestibulum odio nibh. Nullam finibus viverra velit, ac scelerisque lorem sodales sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer volutpat malesuada nisl, vel egestas tortor lobortis nec. Curabitur est nulla, ultrices vitae augue a, mattis commodo est. Vestibulum facilisis fringilla tincidunt. Quisque augue tellus, porta a sagittis nec, tincidunt eu eros. Praesent nec facilisis purus. Integer porttitor gravida imperdiet. Maecenas viverra magna vitae sapien tincidunt, a tempor dui aliquet. Vivamus mattis leo urna, ac volutpat felis mattis et. Cras a justo porta, lobortis eros vitae, interdum est. Vivamus vel elit semper, rutrum arcu sed, ultricies ipsum.",
	},
	{
		name: "The Université de Montréal",
		image:
			"https://media.beam.usnews.com/3c/e7/a2a8014643369af8750c263bf5ad/160629-universityofmontreal-submitted.jpg",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum magna ac tincidunt tincidunt. Pellentesque pulvinar cursus sem, eget mattis erat efficitur in. Cras vestibulum odio nibh. Nullam finibus viverra velit, ac scelerisque lorem sodales sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer volutpat malesuada nisl, vel egestas tortor lobortis nec. Curabitur est nulla, ultrices vitae augue a, mattis commodo est. Vestibulum facilisis fringilla tincidunt. Quisque augue tellus, porta a sagittis nec, tincidunt eu eros. Praesent nec facilisis purus. Integer porttitor gravida imperdiet. Maecenas viverra magna vitae sapien tincidunt, a tempor dui aliquet. Vivamus mattis leo urna, ac volutpat felis mattis et. Cras a justo porta, lobortis eros vitae, interdum est. Vivamus vel elit semper, rutrum arcu sed, ultricies ipsum.",
	},
	{
		name: "UQAM",
		image:
			"https://www.actualites.uqam.ca/sites/default/files/styles/grande/public/campus_central_800pix_4.jpg?itok=gX1XnSaU&c=2db32b84acd9cc76c51f6e06852d6cf3",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque fermentum magna ac tincidunt tincidunt. Pellentesque pulvinar cursus sem, eget mattis erat efficitur in. Cras vestibulum odio nibh. Nullam finibus viverra velit, ac scelerisque lorem sodales sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer volutpat malesuada nisl, vel egestas tortor lobortis nec. Curabitur est nulla, ultrices vitae augue a, mattis commodo est. Vestibulum facilisis fringilla tincidunt. Quisque augue tellus, porta a sagittis nec, tincidunt eu eros. Praesent nec facilisis purus. Integer porttitor gravida imperdiet. Maecenas viverra magna vitae sapien tincidunt, a tempor dui aliquet. Vivamus mattis leo urna, ac volutpat felis mattis et. Cras a justo porta, lobortis eros vitae, interdum est. Vivamus vel elit semper, rutrum arcu sed, ultricies ipsum.",
	},
];

function seedDB() {
	//remove all universities
	University.remove({}, function (err) {
		if (err) {
			console.log(err);
		}
		console.log("removed universities");

		// //add a few universities
		// data.forEach(function(seed){
		//     University.create(seed, function(err, university){
		//         if(err){
		//             console.log(err);
		//         } else {
		//             console.log("added a university...");

		//             //add a few comments
		//             Comment.create(
		//                 {
		//                     text: "Pellentesque pulvinar cursus sem, eget mattis erat efficitur in. Cras vestibulum odio nibh.",
		//                     author: "Lorem ipsum"
		//                 }, function(err, comment){
		//                     if(err){
		//                         console.log(err);
		//                     } else {
		//                         university.comments.push(comment);
		//                         university.save();
		//                         console.log("Created a new comment.");
		//                     }
		//                 });
		//         }
		//     });
		// });
	});
}

module.exports = seedDB;
