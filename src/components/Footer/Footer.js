const Footer = () => {
    return (
        <div className="footer text-center">
            <p>
                Copyright &copy; {new Date().getFullYear()} Blog System
            </p>
            <p>
                Mediumish Theme by <a target="_blank" href="https://www.wowthemes.net">WowThemes.net</a>
            </p>
            <div className="clearfix">
            </div>
        </div>
    );
};

export default Footer;