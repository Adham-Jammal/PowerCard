import nodemailer from "nodemailer";

export default function handler(req, res) {
  const { email, data } = JSON.parse(req.body);
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "alizjeblawi@gmail.com",
      pass: "fewlgixcnkeljemy",
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
  });
  const mailData = {
    from: "New Message <" + "alizjeblawi@gmail.com" + ">",
    to: email,
    subject: "New Message",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
     <head> <meta charset="UTF-8"> 
      <meta content="width=device-width, initial-scale=1" name="viewport"> 
      <meta name="x-apple-disable-message-reformatting"> 
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
      <meta content="telephone=no" name="format-detection"> 
      <title>New email template 2022-08-28</title><!--[if (mso 16)]>    <style type="text/css">    a {text-decoration: none;}    </style>    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--> 
      <style type="text/css">
    .rollover:hover .rollover-first {
      max-height:0px!important;
      display:none!important;
    }
    .rollover:hover .rollover-second {
      max-height:none!important;
      display:block!important;
    }
    #outlook a {
      padding:0;
    }
    .ExternalClass {
      width:100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
      line-height:100%;
    }
    .es-button {
      mso-style-priority:100!important;
      text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
      color:inherit!important;
      text-decoration:none!important;
      font-size:inherit!important;
      font-family:inherit!important;
      font-weight:inherit!important;
      line-height:inherit!important;
    }
    .es-desk-hidden {
      display:none;
      float:left;
      overflow:hidden;
      width:0;
      max-height:0;
      line-height:0;
      mso-hide:all;
    }
    .es-button-border:hover a.es-button, .es-button-border:hover button.es-button {
      background:#80afb6!important;
      border-color:#80afb6!important;
    }
    .es-button-border:hover {
      border-color:#42d159 #42d159 #42d159 #42d159!important;
      background:transparent!important;
    }
    [data-ogsb] .es-button {
      border-width:0!important;
      padding:10px 20px 10px 20px!important;
    }
    td .es-button-border:hover a.es-button-1 {
      background:#f49a23!important;
      border-color:#f49a23!important;
    }
    td .es-button-border-2:hover {
      background:#f49a23!important;
    }@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:28px!important; text-align:center } h2 { font-size:24px!important; text-align:center } h3 { font-size:18px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:18px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:16px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
    @media screen and (max-width:9999px) {.cboxcheck:checked + input + * .thumb-carousel { height:auto!important; max-height:none!important; max-width:none!important; line-height:0 } .thumb-carousel span { font-size:0; line-height:0 } .cboxcheck:checked + input + * .thumb-carousel .car-content { display:none; max-height:0px; overflow:hidden } .cbox0:checked + * .content-1, .thumb-carousel .cbox1:checked + span .content-1, .thumb-carousel .cbox2:checked + span .content-2, .thumb-carousel .cbox3:checked + span .content-3, .thumb-carousel .cbox4:checked + span .content-4, .thumb-carousel .cbox5:checked + span .content-5 { display:block!important; max-height:none!important; overflow:visible!important } .thumb-carousel .thumb { cursor:pointer; display:inline-block!important; width:17.5%; margin:1% 0.61%; border:0px solid rgb(187, 187, 187) } .moz-text-html .thumb { display:none!important } .thumb-carousel .thumb:hover { border:0px solid rgb(68, 68, 68) } .cbox0:checked + * .thumb-1, .thumb-carousel .cbox1:checked + span .thumb-1, .thumb-carousel .cbox2:checked + span .thumb-2, .thumb-carousel .cbox3:checked + span .thumb-3, .thumb-carousel .cbox4:checked + span .thumb-4, .thumb-carousel .cbox5:checked + span .thumb-5 { border-color:rgb(51, 51, 51) } .thumb-carousel .thumb img { width:100%; height:auto } .thumb-carousel img { max-height:none!important } .cboxcheck:checked + input + * .fallback { display:none!important; display:none; max-height:0px; height:0px; overflow:hidden } }
    @media screen and (max-width:600px) {.car-table.responsive, .car-table.responsive .thumb-carousel, .car-table.responsive .thumb-carousel .car-content img, .car-table.responsive .fallback .car-content img { width:100%!important; height:auto } }
    @media screen {}
    </style> 
     </head> 
     <body style="width:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;padding:0;Margin:0"> 
      <div class="es-wrapper-color" style="background-color:#F6F6F6"><!--[if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#f6f6f6"></v:fill>
          </v:background>
        <![endif]--> 
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
         <tr style="border-collapse:collapse"> 
          <td valign="top" style="padding:0;Margin:0"> 
           <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td align="center" style="padding:0;Margin:0"> 
               <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-image:url(https://takvzk.stripocdn.email/content/guids/CABINET_c9ca9619c92608a5cf209eb92ba5be1b/images/70711563360509193.jpeg);background-position:left top;background-repeat:no-repeat" background="https://takvzk.stripocdn.email/content/guids/CABINET_c9ca9619c92608a5cf209eb92ba5be1b/images/70711563360509193.jpeg"><!--[if gte mso 9]>  <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:400px;">    <v:fill type="tile" src="https://tlr.stripocdn.email/content/guids/CABINET_c9ca9619c92608a5cf209eb92ba5be1b/images/70711563360509193.jpeg" color="#7bceeb" ></v:fill>    <v:textbox inset="0,0,0,0">  <![endif]--> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://takvzk.stripocdn.email/content/guids/CABINET_493a8d9219cc6be3fcbf66200de4eb5f/images/powercardlight.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="460"></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#000000;font-size:14px"><strong>Power Card</strong> is the best way to get your digital cards.</p></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffffff;font-size:14px"><br></p></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:20px;font-size:0"> 
                           <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr style="border-collapse:collapse"> 
                              <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><img title="Facebook" src="https://takvzk.stripocdn.email/content/assets/img/social-icons/rounded-white/facebook-rounded-white.png" alt="Fb" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                              <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><img title="Twitter" src="https://takvzk.stripocdn.email/content/assets/img/social-icons/rounded-white/twitter-rounded-white.png" alt="Tw" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                              <td align="center" valign="top" style="padding:0;Margin:0;padding-right:10px"><img title="Instagram" src="https://takvzk.stripocdn.email/content/assets/img/social-icons/rounded-white/instagram-rounded-white.png" alt="Inst" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                              <td align="center" valign="top" style="padding:0;Margin:0"><img title="Youtube" src="https://takvzk.stripocdn.email/content/assets/img/social-icons/rounded-white/youtube-rounded-white.png" alt="Yt" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" height="25" style="padding:0;Margin:0"></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table><!--[if gte mso 9]>    </v:textbox>  </v:rect>  <![endif]--></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td style="padding:0;Margin:0"> 
                           <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                             <tr class="links" style="border-collapse:collapse"> 
                              <td align="center" valign="top" width="25%" id="esd-menu-id-0" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0"><a target="_blank" href="https://powercard-sa.com/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#dd830b;font-size:14px;font-weight:bold">Home</a></td> 
                              <td align="center" valign="top" width="25%" id="esd-menu-id-1" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0"><a target="_blank" href="https://powercard-sa.com/about-us" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#dd830b;font-size:14px;font-weight:bold">About</a></td> 
                              <td align="center" valign="top" width="25%" id="esd-menu-id-2" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0"><a target="_blank" href="https://powercard-sa.com/contact" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#dd830b;font-size:14px;font-weight:bold">Contact</a></td> 
                              <td align="center" valign="top" width="25%" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:10px;padding-bottom:10px;border:0"><a target="_blank" href="https://powercard-sa.com/privacy-policy" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#dd830b;font-size:14px;font-weight:bold">Privacy</a></td> 
                             </tr> 
                           </table></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px;background-position:center top"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="left" style="padding:0;Margin:0"><h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:24px;font-style:normal;font-weight:bold;color:#333333;text-align:center"><strong>Here are our latest offers</strong></h2></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;background-position:center top"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">A market place that has the best in App Store cards, game console cards, mobile and date cards, VOD streaming cards, software cards and gaming cards, suited to the Arab market</p></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px;background-position:left top"><!--[if mso]><table style="width:600px" cellpadding="0" cellspacing="0"><tr><td style="width:200px" valign="top"><![endif]--> 
                   ${data.map(
                     (
                       d
                     ) => `<table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
                    <tr style="border-collapse:collapse"> 
                     <td class="es-m-p20b" align="center" style="padding:0;Margin:0;width:200px"> 
                      <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-position:left top" role="presentation"> 
                        <tr style="border-collapse:collapse"> 
                         <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src=${`https://admin.powercard-sa.com${d.image}`} alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="200"></td> 
                        </tr> 
                        <tr style="border-collapse:collapse"> 
                         <td align="left" bgcolor="#333333" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:10px;padding-right:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;color:#ffffff;font-size:12px;text-align:center">${
                           d.desc
                         }</p></td> 
                        </tr> 
                      </table></td> 
                    </tr> 
                  </table>`
                   )}
                    
                   <!--[if mso]></td><td style="width:200px" valign="top"><![endif]--> 
                  <!--[if mso]></td><td style="width:0px"></td><td style="width:200px" valign="top"><![endif]--> 
                  <!--[if mso]></td></tr></table><![endif]--></td> 
                 </tr> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-position:left top"> 
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px"> 
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:10px;Margin:0"><span class="es-button-border es-button-border-2" style="border-style:solid;border-color:#2CB543;background:#dd830b;border-width:0px;display:inline-block;border-radius:4px;width:auto"><a href="https://powercard-sa.com/" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;border-style:solid;border-color:#dd830b;border-width:10px 20px 10px 20px;display:inline-block;background:#dd830b;border-radius:4px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:17px;width:auto;text-align:center">Shop Now!</a></span></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
      </div>  
     </body>
    </html>`,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return res.status(400).json({ message: "fail" });
    }
    return res.status(200).json({ message: "Mail sent" });
  });
}
