import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const SharePopup = ({ lesson, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0f172a] p-6 rounded-2xl w-full max-w-sm border border-white/20">
        <h3 className="text-lg font-semibold mb-4">Share this lesson</h3>
        <div className="flex justify-around">
          <FacebookShareButton url={window.location.href} quote={lesson.title}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} title={lesson.title}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <WhatsappShareButton url={window.location.href} title={lesson.title}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={window.location.href}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <EmailShareButton url={window.location.href} subject={lesson.title}>
            <EmailIcon size={40} round />
          </EmailShareButton>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full btn btn-sm btn-outline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
