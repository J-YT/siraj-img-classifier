$(document).ready(function () {
    $('.prediction').hide();
    let model;
    let img;

    // predict
    async function predict() {

        // loading model
        $('.prediction').hide();
        $('.upload-label').text('loading...');
        net = await mobilenet.load();
        console.log('Sucessfully loaded model');

        // Make a prediction through the model on our image.
        const imgEl = document.getElementById('image-preview');
        const result = await net.classify(imgEl);
        console.log(result);

        // show result
        $('#image-preview').css('filter', 'blur(0)');
        $('.upload-label').text('choose');
        $('.prediction').show();
        $('#result1').text((JSON.stringify(result[0]['className'] +' : '+ (Math.round(result[0]['probability']*100)/100) )).replace(/['"]+/g, ''));
        $('#result2').text((JSON.stringify(result[1]['className'] +' : '+ (Math.round(result[1]['probability']*100)/100) )).replace(/['"]+/g, ''));
        $('#result3').text((JSON.stringify(result[2]['className'] +' : '+ (Math.round(result[2]['probability']*100)/100) )).replace(/['"]+/g, ''));
    }
    
    // Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            // read content 
            var reader = new FileReader();
            reader.onload = function (e) {
                img=new Image();
                img.src=e.target.result;
                $('#image-preview').attr('src', img.src);
                $('#image-preview').css('width', 'auto');
                $('#image-preview').css('height', 'auto');
                $('#image-preview').css('filter', 'blur(5px)');
                // $('#image-preview').css('margin', '0 auto');
                $('#image-preview').hide();
                $('#image-preview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
            // start predict
            predict();
        }
    }

    // start upload
    $("#imageUpload").change(function () {
        readURL(this);
    });
});

